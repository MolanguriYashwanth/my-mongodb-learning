import express from 'express';
const router = express.Router();
const ingredientsRoute = {};
const ingredientsService = require('../services/ingredientsService');

ingredientsRoute.getRoutes = function () {
    router.get('/', (req, res) => {
        // post - update the store
        ingredientsService.getQueryOutput(req, res);
      });  
      router.get('/title', (req, res) => {
        // post - update the store
        ingredientsService.getQueryOutputByTitle(req, res);
      });
      router.delete('/delteingrdient',(req,res)=>{
        ingredientsService.removeIngredientBasedOnId(req, res);
      })
  router.post('/data', (req, res) => {
    // post - update the store
    ingredientsService.storeOrdersinDB(req, res);
  });
  return router;
};

export default ingredientsRoute;
