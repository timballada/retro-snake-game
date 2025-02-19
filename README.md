# Retro Snake Game Project

This project is a web-based implementation of the classic Snake game with user authentication and high score tracking. It combines nostalgic gameplay with modern web development technologies and serves as an excellent demonstration of integrating game logic into a full-stack application.

[YouTube Video: Walkthrough](https://www.youtube.com/watch?v=u_MavYR8sjg)
---
![image](https://github.com/user-attachments/assets/5916ca52-612e-4a3b-bb6d-515a8c263d21)

## Key Technologies and Software

- **Node.js**: The runtime environment used to execute JavaScript on the server side.
- **Express.js**: A minimal and flexible Node.js web application framework that handles routing, middleware, and HTTP requests.
- **EJS (Embedded JavaScript Templates)**: The templating engine used for dynamically rendering HTML views.
- **PostgreSQL**: The relational database system used to store user data and game scores. The [pg](https://node-postgres.com/) library is used for database interactions.

![image](https://github.com/user-attachments/assets/f58ae348-d77f-4f65-96ff-8d2c61586057)

- **Passport.js**: A popular authentication middleware for Node.js, utilized here with the Local Strategy to handle username and password-based authentication.
- **bcryptjs**: A library for hashing and comparing passwords to ensure secure storage and verification of user credentials.
- **express-session**: Middleware used to manage user sessions, maintaining authentication state across HTTP requests.

## Project Features

- **User Registration and Login**: New users can sign up, and existing users can log in. Authentication is managed through Passport.js, with passwords securely hashed using bcrypt.

|||
|---|---|
|![image](https://github.com/user-attachments/assets/c397db52-9d5c-47c5-819a-8f3c92a6fa24)|![image](https://github.com/user-attachments/assets/a6fe3db7-a439-4038-b7e0-9bfa731956ad)|

- **Session Management**: User sessions are maintained using express-session, ensuring a smooth and secure login experience.
- **Account Management**: Users can update their passwords, with the system verifying the current password before allowing changes.

![image](https://github.com/user-attachments/assets/3b1f5c0f-5969-47e7-9f59-03e03c536beb)

- **High Score Tracking**: The application records high scores for the Snake game, updating the database when a user achieves a new high score.
- **Game Interface**: The Snake game itself is rendered on a dedicated route, providing an interactive gaming experience directly within the web application.

## How It Works

1. **Routing and Views**:  
   - The server is set up with various routes for home, sign-up, login, account management, and the Snake game.  
   - EJS templates render dynamic HTML pages, passing in user data and status messages (e.g., login errors, password reset notifications).

2. **Authentication Flow**:  
   - Users register by providing a username and password, which is then hashed and stored in a PostgreSQL database.  
   - Upon login, Passport's Local Strategy verifies credentials by comparing the provided password with the hashed version stored in the database.
   - Successful authentication leads to session creation, and users can access protected routes like the game interface and account management pages.

3. **Database Interactions**:  
   - The application connects to a PostgreSQL database using the `pg` module and manages data (users and high scores) through SQL queries.
   - Note: While the code includes a commented-out secure query (using parameterized queries), an insecure version (concatenating user input) is currently active for username lookup. **This should be replaced with the secure version to prevent SQL injection vulnerabilities.**

4. **Game Integration**:  
   - The Snake game is accessible via its own route (`/snake`), where gameplay occurs and high scores are submitted back to the server for updating the user's record in the database.

## Running the Project

To run the project locally, ensure you have Node.js and PostgreSQL installed. Then:

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Set up your PostgreSQL database and update the connection settings in `app.js` if needed.
4. Start the server with `node app.js` (or use a process manager like nodemon for development).
5. Open your browser and navigate to `http://localhost:3000` to access the application.



---

