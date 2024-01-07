# Dailyhub - a web application for personal project management

## Introduction
Dailyhub is a personal information system with low learning costs and user-friendly features, utilizing the MERN technology stack and Agile development methodology. 
The core features of the system include schedule management, task management, and personal diary functions, aiming to comprehensively meet users’ daily management needs.

## Features
### - Feature 1: User register and login
  ![屏幕截图 2023-11-05 231128](https://github.com/tanyajin/Dailyhub/assets/102398885/2a3c355a-0047-49fe-b1d9-5d8238f90a40)

### - Feature 2: Schedule management
![屏幕截图 2023-11-05 231436](https://github.com/tanyajin/Dailyhub/assets/102398885/681ffc87-4108-4a13-8454-b59a2f713781)

### - Feature 3: Task management
![屏幕截图 2023-11-05 232329](https://github.com/tanyajin/Dailyhub/assets/102398885/fd3e4bcf-4842-4b9d-a03f-57e78d54c3c6)

### - Feature 4: Diary management
![屏幕截图 2023-11-05 231307](https://github.com/tanyajin/Dailyhub/assets/102398885/0e224ec6-bedc-4a95-90f3-150631a597fe)


## Technology stack

- [React](https://reactjs.org) and [React Router](https://reactrouter.com/en/main) for frontend
- [TailwindCSS](https://tailwindcss.com/),[Material-UI](https://mui.com/),[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) and [Spline](https://spline.design/) for UI design
- [Express](http://expressjs.com/) and [Node](https://nodejs.org/en/) for the backend
- [MongoDB](https://www.mongodb.com/) for the database
- [Redux](https://redux.js.org/basics/usagewithreact) for state management between React components

## Running the Application

 ### 1. Running Locally
To get this project running locally, follow these steps:

 #### 1) Installing MongoDB
To run this application, you need to have MongoDB installed and running on your local machine. Follow these steps to set up MongoDB locally and configure the necessary environment variables.

 **Download MongoDB Compass**:
   - Download the appropriate version for your operating system: [MongoDB Compass](https://www.mongodb.com/products/tools/compass).

**Install MongoDB**:
   - Follow the installation instructions provided on the MongoDB website for your specific operating system.

 **Run MongoDB**:
   - After installation, start the MongoDB server.
   - On most systems, this can be done using the command line with a command like `mongod`.

#### 2) Setting Up the Database
   - Connect to your local MongoDB instance (usually through a MongoDB client or the MongoDB shell).
   - Create a new database named `diary-app` or the name you like.

 #### 3) Running the Application

Once you have MongoDB installed and the environment variables set up, you can run the application as described in the [Running the Application](#running-the-application) section.

Remember to restart your development environment or terminal session to ensure that the changes to environment variables take effect.

- Clone the repository
```bash
git clone git@github.com:tanyajin/Dailyhub.git
```

- Install dependencies

```bash
# Install client dependencies
cd Dailyhub/client
npm install

# Install server dependencies
cd Dailyhub/server
npm install
```
- Run the application
```bash
# Run client
cd Dailyhub/client
npm run dev

# Run web server
cd Dailyhub/server
yarn start run 
```

# The application should now be running on [mention the default port, e.g., http://localhost:3000]

