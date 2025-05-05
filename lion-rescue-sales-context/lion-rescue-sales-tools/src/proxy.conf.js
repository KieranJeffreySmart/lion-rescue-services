module.exports = {
    "/offers/*": {
      target:
        process.env["services__offersapi__https__0"] ||
        process.env["services__offersapi__http__0"],
      secure: process.env["NODE_ENV"] !== "development",
      secure: false,
      logLevel: "debug",
      changeOrigin: true,
      pathRewrite: {
        "^/offers":  "/offers",
      },
    },
  };


  
