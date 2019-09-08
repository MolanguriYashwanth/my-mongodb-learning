import express from 'express';

const router = express.Router();
const burgerIngredientsRoute = {};
const burgerIngredientsService = require('../services/burgerIngredientsService');

burgerIngredientsRoute.getRoutes = function () {
  router.get('/', (req, res) => {
    // post - update the store
    burgerIngredientsService.getQueryOutput(req, res);
  });
  return router;
};

export default burgerIngredientsRoute;
