
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Quick install
```
wget -O - https://github.com/1dagranholm/u11-fullstack-js/blob/master/install.sh | bash
```

## REACT APP

### Environment-file are needed before the app is started.
Rename the file `.env.example` to `.env` in the app directory and add your settings.

#### Available scripts:

**`npm start`** 
Will launch the application with `HTTP` support and use port `8000`.

**`npm startssl`** 
Will launch the application with `HTTPS` support and use port `8000`.

**`npm run build`**
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Learn more

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).



## NODE SERVER

### Enviroment-file are needed before the server is started.
Rename the file `.env.dev.example` to `.env.dev` in the server directory and add your config.

### Available scripts:
**`nodemon start`**
Runs the server in the development mode.
The server is set up to run on both `HTTP` and `HTTPS`.
SSL url: [https://localhost:8443](https://localhost:8443)
Url without SSL: [http://localhost:8080](http://localhost:8080)

**`node server.js`**
Runs the server in production mode.
