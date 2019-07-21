import express from 'express';
import burgerBuildRoute from './routes/burgerBuildRoute';

const PORT = 8085;
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

app.use('/burger/build', burgerBuildRoute.getRoutes());


const server = app.listen(PORT, () => {
    console.log('App listening on port '+PORT);
  });
  
  
  export default server;
  


//   "devDependencies": {
//     "babel-cli": "^6.11.4",
//     "babel-core": "^6.26.0",
//     "babel-preset-es2015": "^6.13.2",
//     "babel-preset-stage-2": "^6.13.0",
//     "babel-register": "^6.11.6",
//     "eslint": "^4.11.0",
//     "eslint-config-airbnb": "^16.1.0",
//     "eslint-config-airbnb-base": "^12.1.0",
//     "eslint-plugin-import": "^2.8.0"
//   }