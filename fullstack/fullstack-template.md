
1. ```create-react-app APP_NAME``` to spin up a react app
2. Dependencies:
    - ```npm i``` - make sure you have Node up and running
    - ```npm i express```
    - ```npm i axios```
    - ```npm i massive```
    - ```npm i express```
    - ```npm i express-session```
    - ```npm i dotenv``` : loads environment variables from a .env file into process.env.
        - ```const {CONNECTION_STRING, SERVER_PORT} = process.env```
    - ```npm i react-redux```
    - ```npm i redux-promise-middleware```
    - ```npm i combineReducers```


    - Set up 'main' (for node/nodemon) and 'proxy' (so we don't have to hard-code all of our endpoints)
        - inside of package.json in the root of our app: 
            - ```  "main": "server/server.js", "proxy": "http://localhost:4000",```
    - add ```.env``` to the .gitignore file
3. Create your folder structure
    - db (must be called this for massive() to find it)
        - contains sql files for CRUD commands
        - should also have a seed.sql file for creating your table
    - server
        - controller.js
        - server.js
    - src
        - files 
            - App.js
            - index.js 
            - routes.js
        - directories 
            - components
            - ducks 
                - reducer.js
                - store.js

