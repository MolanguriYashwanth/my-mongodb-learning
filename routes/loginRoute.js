import express from 'express';
const router = express.Router();
const loginRoute = {};
const loginService = require('../services/loginService');

loginRoute.getRoutes = function () {
  router.post('/login', (req, res) => {
    // post - update the store
    loginService.checkUserIsValid(req, res);
  });
  return router;
};

export default loginRoute;
