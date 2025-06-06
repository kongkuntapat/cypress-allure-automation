const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  projectId: 'g1qn25',
  e2e: {
    baseUrl: "https://www.saucedemo.com/",

    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});
