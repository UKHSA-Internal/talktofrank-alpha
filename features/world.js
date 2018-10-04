// Dependencies
const { setWorldConstructor, setDefaultTimeout } = require('cucumber');
const puppeteer = require('puppeteer');
const scope = require('./support/scope');

const World = function() {
  scope.host = process.env.CUCUMBER_HOST;
  scope.driver = puppeteer;
  scope.context = {};
//   scope.api = api;
//   scope.web = web;
};

setWorldConstructor(World);
setDefaultTimeout(60 * 1000);