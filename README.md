Express.js CRUD Application
This repository contains a CRUD (Create, Read, Update, Delete) application built with Express.js, Sequelize, and PostgreSQL. It provides a simple backend for managing companies and their related data.

Getting Started
Prerequisites
Make sure you have the following software installed on your machine:

Node.js
PostgreSQL
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/forge-task-2-express.js-crud.git
Navigate to the project directory:

bash
Copy code
cd forge-task-2-express.js-crud
Install dependencies:

bash
Copy code
npm install
Set up your environment variables:

Create a .env file in the root of your project and configure your environment variables. Example:

env
Copy code
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_PORT=
NODE_ENV=
PORT = 

bash
Copy code
npm run dev
Run the application in production mode:

bash
Copy code
npm run serve
Visit http://localhost:3000 in your browser to access the application.

Project Structure
controllers: Contains route handlers for different entities.
middlewares: Custom middleware functions.
models: Sequelize model definitions for database tables.
repositories: Data access layer for interacting with the database.
routes: Express routes for different entities.
services: Business logic layer to handle application-specific functionality.
utils: Utility functions.
Dependencies
bcrypt: Password hashing library.
body-parser: Middleware to parse HTTP request bodies.
dotenv: Environment variable management.
express: Web application framework.
express-validator: Validation library for Express.
pg: PostgreSQL database driver.
sequelize: Promise-based ORM for Node.js.
License
This project is licensed under the ISC License - see the LICENSE file for details.

