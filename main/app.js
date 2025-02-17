const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const pool = new Pool({
  host: "localhost",
  user: "timballada",
  database: "game_users",
  password: "password",
  port: 5432,
});

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        // "SELECT * FROM users WHERE username = $1", //SECURE VERSION
        // [username],
        "SELECT * FROM users WHERE username = '" + username + "'", //INSECURE VERSION
      );
      const user = rows[0];

      if (!user) {
        console.log("incorrect username");
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        console.log("incorrect password");
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});
app.get("/sign-up", (req, res) => res.render("sign-up-form"));
app.post("/sign-up", async (req, res, next) => {
  await bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
    try {
      pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
        req.body.username,
        hashedPassword,
      ]);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  });
});

app.get("/account", (req, res) => res.render("account", { user: req.user }));
app.post("/account", async (req, res, next) => {
  const match = await bcrypt.compare(req.body.currentpw, req.user.password);
  if (!match) {
    res.redirect("/reset-error");
  } else {
    await bcrypt.hash(req.body.newpw, 10, function (err, hashedPassword) {
      try {
        pool.query("UPDATE users SET password = $1 WHERE username = $2", [
          hashedPassword,
          req.user.username,
        ]);
        res.redirect("/reset-success");
      } catch (err) {
        return next(err);
      }
    });
  }
});
app.get("/reset-error", (req, res) => {
  res.render("account", { user: req.user, resetError: true });
});
app.get("/reset-success", (req, res) => {
  res.render("account", { user: req.user, resetSuccess: true });
});

app.post(
  "/log-in",
  passport.authenticate("local", {
    failureRedirect: "/log-in",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/home");
  },
);
app.get("/log-in", (req, res) => {
  res.render("index", { user: req.user, loginError: true });
});
app.get("/home", (req, res) => {
  res.render("home", { user: req.user });
});
app.get("/snake", (req, res) => {
  res.render("snake", { user: req.user });
});
app.post("/snake", async (req, res, next) => {
  try {
    await pool.query("UPDATE users SET highscore = $1 WHERE username = $2", [
      req.body.new,
      req.user.username,
    ]);
    res.redirect("/snake");
  } catch (err) {
    return next(err);
  }
});
app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("app listening on port 3000!"));
