This is a base node js project template, which anyone can use as it has been prepared, by keeping some of the most important code principles and project management recommendations. Feel free to change anything.

`src` --> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests. (You might want to make seperate tests folder).

Let's take a look inside the `src` folder

 - `config` --> In this folder anything and erevrything regarding any configurations or setup of a library or module will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere ina cleaner fashion, this is done in the `server-config.js`. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here.

 - `routes` --> In this routes folder, we register a route and the corresponding middleware and controllers to it. 

 -`middlewares` --> They are justgoing to intercept the incoming requests, where we can write our validators, authenticators etc.

 - `controllers` --> They are kind of the last middlewares as post them you call your business layer to execute the business logic. In controllers we just recieve the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output.

 -`repositories` --> This folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

 - `services` --> It contains the business logic and interact with repositories for data from the database.

 - `utils` --> It contains helper methods, error classes etc.

### Setup the project

 - Download this template from github and open it in your favorite text editor.
 - Go inside the folder path and execute the following command:
  ```
  npm install
  ```
 - Inside the `src/config` folder create a file named as `config.json` and write the following code:
  ```
    {
    "development": {
        "username": "root",
        "password": null,
        "database": "database_development",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
    }
  ```
 - Or go inside the `src` folder and execute the following command:
  ```
    npx sequelize init
  ```
 - By executing the above command you will get the migrations and seeders folder along with a config.json inside the config folder.
 - If you're setting up your development environment, then write the username, password of your db and in dialect mention whatever db you are using. For ex:
 mysql, mariadb etc.
 - If you're setting up test or prod environment, make sure you also replace the host with the hosted db url.
 - To run the server execute 
  ```
    npm run dev
  ```