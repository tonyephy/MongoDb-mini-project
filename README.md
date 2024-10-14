# MongoDb-mini-project
# its a mini mongodb project
```markdown
# MongoDB Mini Project

# Overview

This project is a simple user authentication application built using Node.js, Express, and MongoDB. It allows users to sign up, log in, update their details, and log out. Passwords are securely hashed using bcrypt, and user sessions are managed with express-session.

## Features

- User sign-up with unique username and email
- User login with password validation
- Update user details (username and email)
- User logout
- Sessions management to keep users logged in
- Static HTML pages served for the sign-in and home pages

## Technologies Used

- Node.js: JavaScript runtime for server-side development
- Express.js: Web framework for building web applications
- MongoDB: NoSQL database for storing user data
- Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js
- bcrypt: Library to hash passwords for secure storage
- express-session: Middleware for managing user sessions
- body-parser: Middleware for parsing request bodies

## Installation

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running

### Steps

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd mongodb-mini-project
   ```

2. **Install the dependencies**:

   ```bash
   npm install
   ```

3. **Start the MongoDB server** (if not already running):

   ```bash
   mongod
   ```

4. **Run the application**:

   ```bash
   node app.js
   ```

5. **Open your browser and navigate to** [http://localhost:3000](http://localhost:3000).

## Directory Structure

```
mongodb-mini-project/
│
├── public/
│   ├── index.html      # Sign-in page
│   └── home.html       # Home page after login
│
├── app.js              # Main application file
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

## Usage

1. **Sign Up**: Navigate to the sign-in page, enter a username, email, and password to create a new account.
2. **Log In**: After signing up, you will be automatically logged in. You can also log in using existing credentials.
3. **Update Details**: Once logged in, you can update your username and email.
4. **Logout**: Click on the logout button to end your session and be redirected to the sign-in page.

## Contributing

Feel free to fork the repository, make improvements, and submit pull requests. Any contributions are welcome!

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [express-session](https://www.npmjs.com/package/express-session)
- [body-parser](https://www.npmjs.com/package/body-parser)
```
