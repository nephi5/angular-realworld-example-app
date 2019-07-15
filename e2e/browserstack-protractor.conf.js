const { SpecReporter } = require('jasmine-spec-reporter');
const browserstack = require('browserstack-local');

const browserstackUserName = process.env.BROWSERSTACK_USERNAME ? process.env.BROWSERSTACK_USERNAME : 'INSER_YOUR_USERNAME_HERE';
const browserstackKey = process.env.BROWSERSTACK_KEY ? process.env.BROWSERSTACK_KEY : 'INSER_YOU_KEY_HERE';

exports.config = {
  allScriptsTimeout: 11000,
  'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',
  specs: [
    './**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'safari',
    'browserstack.user': browserstackUserName,
    'browserstack.key': browserstackKey,
    'browserstack.local': true,
    'name': 'Bstack-[Protractor] Local Test',
    'device': 'iPhone XS',
    'realMobile': 'true',
    'os_version': '12',
    'browserstack.debug': true,
  },
  baseUrl: 'https://nephi5.github.io/angular-realworld-example-app/',
  framework: 'jasmine',
  SELENIUM_PROMISE_MANAGER: false,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
  beforeLaunch: function () {
    console.log("Connecting local");
    return new Promise(function (resolve, reject) {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({ 'key': browserstackKey }, function (error) {
        if (error) return reject(error);
        console.log('Connected. Now testing...');

        resolve();
      });
    });
  },
  afterLaunch: function () {
    return new Promise(function (resolve, reject) {
      exports.bs_local.stop(resolve);
    });
  }
};
