const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",

    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});
