// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  seleniumAddress: 'http://localhost:4723/wd/hub',
  specs: [
    './**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'safari',
    platformName: 'iOS',
    platformVersion: '12.1',
    deviceName: 'iPhone 8',
    'appium-version': '1.9.0',
  },
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: 'https://nephi5.github.io/angular-realworld-example-app/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },
  onPrepare() {
    require('ts-node').register({
      project: './e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
