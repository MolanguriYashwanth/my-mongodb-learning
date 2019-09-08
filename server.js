import express from 'express';
import bodyParser from 'body-parser';
import burgerBuildRoute from './routes/burgerBuildRoute';
import burgerIngredientsRoute from "./routes/burgerIngredientsRoute";

const PORT = 8085;
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/burger/build', burgerBuildRoute.getRoutes());
app.use('/burger/ingredients', burgerIngredientsRoute.getRoutes());


const server = app.listen(PORT, () => {
  console.log('App listening on port ' + PORT);
});


export default server;

