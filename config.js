module.exports = {
  serverConfig() {
    switch (process.env.NODE_ENV) {
      default:
        return {
          mongoConfig: {
            burgerDB: 'mongodb://localhost:27017',
          },
          secret: 'worldisfullofdevelopers'
        };
    }
  },
};
