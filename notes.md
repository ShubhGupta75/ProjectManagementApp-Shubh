# Notes of Backend

## Initial Steps of Creating any backend project

- **Make a PRD(project requirement document)**

- **Run "npm init"** : to start the initialization of the project and it also makes you a custom package.json file.

- **Modify the scripts acccording to your preferance.**
**Ex:-**  ```"scripts": {
    "dev": "node index.js"
  }```  : this means when we will enter command "npm run dev", "node index.js" will get executed.

- **Add a "type"**  : commonjs(for require) and module(for import)


## Making our project workable and have sync with multiple devs

- **Install prettier** : npm install --save-dev --save-exact prettier

- **Format all files with prettier** : npx prettier . --write

- **Set one format of writing code in .prettierrc.**

- **Also add a .prettierignore file to let your editor know which files not to touch.**

- **Similarly create a .gitignore file also.**

- **Create a git repo through the terminal itself.**


## Creating an Auto restart for our Server(similar as LiveServer for HTML) (Hot refresh/reloading)

- **We can do this by either "nodemon" module or "node --watch"**

- **nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.**

- **Install nodemon as a development dependency** :
```npm install --save-dev nodemon```


## Securing sensitive credentials using env variables.

- **import dotenv module** : ```npm i dotenv```

-** Select the path** : ```dotenv.config({path: "./.env"})```;

- **Access any env variables by using** : ```let username = process.env.myUsername```


## Professional project structure

- **public folder**  :  images

- **src**  :  controllers(logics), db, middlewares, models(structure of data you are going to keep in database), routes, utils(reusable codes), validators.

- **To create a folder directly from terminal**  :  use "mkdir folderName"

- **Adding subfolders** : "cd src"-> "mkdir subfolderNames" with commas
- **cd ..** : to get out of the folder



## There are two main components of an application

- **How will the routing structure work like**

- **How we will interact with the database**


## ExpressJs

**Express is a web application framework for Node.js. A tool that makes building web servers with Node.js simple, fast, and organized.**

- **This defines a route for the URL path** : "/.."

- **app.get** : handles GET requests (like when you visit a page in a browser).

- **'/'** : means the home page (root URL).

- **req** : details about the incoming request (like headers, query, body).

- **res** : used to send a reply back to the client.

- **app.listen(port, () : { ... })**  :  This starts the server and makes it listen for incoming requests on the specified port. The callback function runs once the server starts successfully.


## POSTMAN

**It's a API testing and developement tool.**


## Middlewares

- **Middleware is basically a function that runs between the request and the response.**

- **Structure** : ```app.use((req, res, next) : { });```

- **next()** : pass control to the next middleware or route.

- ```app.use(express.json({limit: "16kb"}))``` :
 This middleware allows your server to understand JSON data sent in requests.

- ```app.use(express.urlencoded({extended: true, limit: "16kb"}))```  :  This middleware helps Express parse data from HTML form submissions.

- ```extended: true```  :  allows nested objects.

- ```app.use(express.static("public"))```  :  This middleware makes all files in the "public" folder publicly accessible to the browser.


## CORS(Cross-Origin Resource Sharing)

**CORS middleware controls who can access your backend,
what they can send, and how they can authenticate —
ensuring both security and smooth frontend-backend communication.**

- ```app.use(cors({}))```  :  declaring a cors

- ```origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173"```  :  This specifies which origins are allowed to call your backend(multiple urls ,5173, etc)

- ```credentials: true```  :  This allows the browser to include credentials (like cookies, authorization headers, or sessions) when making requests.

- ```methods:```

- ```allowedHeaders:```  :  Specifies which headers are allowed in requests.

**"Content-Type"**  :  allows sending JSON or form data.
**"Authorization"**  :  allows sending tokens or auth credentials.

**These setup is important because it prevents CORS errors during development.**

#### ("https://example.com,https://another.com")  : example of multiple urls.
#### Ctrl+c is used to kill a ongoing npm run.


## Standard APIResponse and API errors

**When client requests a server, it only sends either a response or an error.**

**This is a standard and usable template.**

- **Response**  :  statusCode, data, message, success

- **Error**  :  statusCode, data = null, message, array of errors, success = false, stack trace(if there then ok otherwise create one using ```Error.captureStackTrace(this, this.constructor)```).

## We need to keep some data in constants.

 **UserRoles, TaskStatus**

**As the project goes further we can add more constants for export.**


## Connection with MongoDb

**We will use Mongoose for this**

- **import Mongoose**

- **Create a async function with try and catch block.**

- **Use ```await mongoose.connect()``` to connect to db.**

- **If connection fails, use** :
  - console.error("❌ MongoDb connection error", error)
  - process.exit(1)

- **Now got to**: index.js -> import connectDb -> call connectDb and use then() and catch()

- **Use ```app.listen()``` in then() and handle error in catch().**


## HealthCheck

**A health check is a lightweight endpoint (like /health) that confirms your backend and dependencies are up, connected, and ready.**

**Structure** :  controllers -> routes -> app.js

**Flow** :
- Client hits ```/api/v1/healthcheck```.

- ```app.use("/api/v1/healthcheck", healthCheckRouter)``` gets executed

- ```healthCheckRouter``` gets called

- ```router.route("/").get(heatlthCheck)``` get's executed

- request is send to ```healthcheck.controller.js```

- ```res.status(200).json({ ... })``` is executed

- Response is send to client.

**routes** : Defines URL routes for each feature.

**controllers** : Contains the logic (what happens when a route is hit)


## Async handler

**asyncHandler automatically catches errors in async functions so that you don’t have to write try...catch in every route.**

**asyncHandler() function a Higher Order Function which  returns another fucntion.**

**Creating asyncHandler()** :
- ```const asyncHandler = (requestHandler) => { ... }```, requestHandler is the actual route function(healthcheck.controller).

- It returns another function ```(req, res, next) => { ... }```, Express expects route handlers to be in this shape.

- ```Promise.resolve(requestHandler(req, res, next))```, It runs your async function (the route) and wraps it in a resolved promise.

- ```.catch((err) => next(err))```, handles error.


## HealthCheck code

### Controller code

- **Here’s the controller** :

  ```js
  const heatlthCheck = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, { message: "Server is running" }));
  });

### Router code

- **Here’s the route** :

  ```js
  const router = Router();
  router.route("/").get(heatlthCheck);
  export default router;


### The Standard and Resuable backend components is over and the Task specific backend will get started.
