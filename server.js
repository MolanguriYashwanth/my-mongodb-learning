import express from 'express';
import bodyParser from 'body-parser';
import burgerBuildRoute from './routes/burgerBuildRoute';
import burgerIngredientsRoute from "./routes/burgerIngredientsRoute";
import loginRoute from "./routes/loginRoute";
import ingredientRoute from "./routes/ingredientsRoute";
const PORT = 8085;
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,DELETE,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/authentication',loginRoute.getRoutes());
app.use('/burger/build', burgerBuildRoute.getRoutes());
app.use('/burger/ingredients', burgerIngredientsRoute.getRoutes());
app.use('/my/ingredients',ingredientRoute.getRoutes());

const server = app.listen(PORT, () => {
  console.log('App listening on port ' + PORT);
});


export default server;

