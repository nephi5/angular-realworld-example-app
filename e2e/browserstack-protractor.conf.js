const { SpecReporter } = require('jasmine-spec-reporter');
const browserstack = require('browserstack-local');

const browserstackUserName = process.env.BROWSERSTACK_USERNAME
  ? process.env.BROWSERSTACK_USERNAME
  : 'INSERT_YOUR_USERNAME_HERE';
const browserstackKey = process.env.BROWSERSTACK_KEY
  ? process.env.BROWSERSTACK_KEY
  : 'INSERT_YOU_KEY_HERE';

const commonCapabilities = {
  'browserstack.user': browserstackUserName,
  'browserstack.key': browserstackKey,
  'browserstack.local': true,
  name: 'Bstack-[Protractor]',
  'browserstack.debug': true,
  'browserstack.networkLogs': true
};

const desktopCabilities = {
  resolution: '1024x768'
};

const config = {
  allScriptsTimeout: 11000,
  seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',
  specs: ['./**/*.e2e-spec.ts'],
  multiCapabilities: [
    // {
    //   os: 'Windows',
    //   os_version: '10',
    //   browserName: 'Chrome',
    //   browser_version: '62.0'
    // }
    // {
    //   browserName: 'Chrome',
    //   device: 'Samsung Galaxy S9 Plus',
    //   realMobile: 'true',
    //   os_version: '9.0'
    // }
    // {
    //   os: 'OS X',
    //   os_version: 'High Sierra',
    //   browserName: 'Safari',
    //   browser_version: '11.0'
    // }
    {
      browserName: 'Safari',
      device: 'iPhone 8 Plus',
      realMobile: 'true',
      os_version: '11'
    }
  ],
  baseUrl: 'https://nephi5.github.io/angular-realworld-example-app/',
  framework: 'jasmine',
  SELENIUM_PROMISE_MANAGER: false,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine
      .getEnv()
      .addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
  beforeLaunch: function() {
    console.log('Connecting local');
    return new Promise(function(resolve, reject) {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({ key: browserstackKey }, function(error) {
        if (error) return reject(error);
        console.log('Connected. Now testing...');
        resolve();
      });
    });
  },
  afterLaunch: function() {
    return new Promise(function(resolve, reject) {
      exports.bs_local.stop(resolve);
    });
  }
};

config.multiCapabilities = config.multiCapabilities.map(config => {
  config = {
    ...config,
    ...commonCapabilities
  };

  if (!config.realMobile) {
    config = {
      ...config,
      ...desktopCabilities
    };
  }

  let name = commonCapabilities.name;

  if (config.os && config.os_version) {
    name = `${name} ${config.os} ${config.os_version} -`;
  }

  if (config.browser_version) {
    name = `${name} ${config.browserName} ${config.browser_version}`;
  }

  if (config.realMobile) {
    name = `${name} ${config.device} - ${config.browserName}`;
  }

  config.name = name;

  return config;
});

exports.config = config;
