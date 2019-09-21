import express from 'express';
const router = express.Router();
const burgerBuildRoute = {};
const burgerBuildService = require('../services/burgerBuildService');

burgerBuildRoute.getRoutes = function () {
  router.get('/getburgers', (req,res) => {
    // post - update the store
    burgerBuildService.getQueryOutput(req, res);
  });
  router.post('/orders', (req, res) => {
    // post - update the store
    burgerBuildService.storeOrdersinDB(req, res);
  });
  return router;
};

export default burgerBuildRoute;
