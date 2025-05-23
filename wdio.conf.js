import allure from 'allure-commandline';
import { existsSync, mkdirSync, rm } from 'fs';
import { resolve as _resolve } from 'path';
const tmpFilesPath = _resolve('./test/.artifacts');
const downloadsFolder = _resolve(tmpFilesPath, 'downloads');

import { JSONReporter, HTMLReportGenerator } from 'wdio-json-html-reporter';
import JSONToExcelConverter from './custom_report/jsonConvertor.js';
const converter = new JSONToExcelConverter('./test/.artifacts/test-report.xlsx', 'Yes'); // set No for to avoid screenshot binding in Excel report
const reportGenerator = new HTMLReportGenerator('test/.artifacts/test-report.html');

export const config = {
	//
	// ====================
	// Runner Configuration
	// ====================
	//
	//
	// ==================
	// Specify Test Files
	// ==================
	// Define which test specs should run. The pattern is relative to the directory
	// from which `wdio` was called.
	//
	// The specs are defined as an array of spec files (optionally using wildcards
	// that will be expanded). The test for each spec file will be run in a separate
	// worker process. In order to have a group of spec files run in the same worker
	// process simply enclose them in an array within the specs array.
	//
	// If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
	// then the current working directory is where your `package.json` resides, so `wdio`
	// will be called from there.
	//
	specs: ['./test/specs/**/example.spec.js'],
	// Patterns to exclude.
	exclude: [
		// 'path/to/excluded/files'
	],
	suites: {
		full_suite: ['./test/specs/**/*.js'],
		//Path for Suite 1
		suite1: ['./test/specs/**/*.js'],
		//Path for Suite 2
		suite2: ['./test/specs/**/*.js'],
	},
	//
	// ============
	// Capabilities
	// ============
	// Define your capabilities here. WebdriverIO can run multiple capabilities at the same
	// time. Depending on the number of capabilities, WebdriverIO launches several test
	// sessions. Within your capabilities you can overwrite the spec and exclude options in
	// order to group specific specs to a specific capability.
	//
	// First, you can define how many instances should be started at the same time. Let's
	// say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
	// set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
	// files and you set maxInstances to 10, all spec files will get tested at the same time
	// and 30 processes will get spawned. The property handles how many capabilities
	// from the same test should run tests.
	//
	maxInstances: 10,
	//
	// If you have trouble getting all important capabilities together, check out the
	// Sauce Labs platform configurator - a great tool to configure your capabilities:
	// https://saucelabs.com/platform/platform-configurator
	//
	capabilities: [
		{
			// maxInstances can get overwritten per capability. So if you have an in-house Selenium
			// grid with only 5 firefox instances available you can make sure that not more than
			// 5 instances get started at a time.
			'maxInstances': 1,
			'browserName': 'MicrosoftEdge',
			'wdio:edgedriverOptions': {
				// or 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
				//binary: './node_modules/chromedriver/lib/chromedriver/chromedriver', // or 'geckodriver', 'msedgedriver'
			},

			'acceptInsecureCerts': true,
			'ms:edgeOptions': {
				args: [
					'--window-size=1920,1080',
					'--inprivate',
					'--headless',
					//'--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
				],
				excludeSwitches: ['enable-automation'],
				prefs: {
					'download.prompt_for_download': false,
					'directory_upgrade': true,
					'download.default_directory': downloadsFolder,
				},
			},
			// If outputDir is provided WebdriverIO can capture driver session logs
			// it is possible to configure which logTypes to include/exclude.
			// excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
			// excludeDriverLogs: ['bugreport', 'server'],
		},
	],
	//
	// ===================
	// Test Configurations
	// ===================
	// Define all options that are relevant for the WebdriverIO instance here
	//
	// Level of logging verbosity: trace | debug | info | warn | error | silent
	logLevel: 'error',
	//
	// Set specific log levels per logger
	// loggers:
	// - webdriver, webdriverio
	// - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
	// - @wdio/mocha-framework, @wdio/jasmine-framework
	// - @wdio/local-runner
	// - @wdio/sumologic-reporter
	// - @wdio/cli, @wdio/config, @wdio/utils
	// Level of logging verbosity: trace | debug | info | warn | error | silent
	// logLevels: {
	//     webdriver: 'info',
	//     '@wdio/appium-service': 'info'
	// },
	//
	// If you only want to run your tests until a specific amount of tests have failed use
	// bail (default is 0 - don't bail, run all tests).
	bail: 0,
	//
	// Set a base URL in order to shorten url command calls. If your `url` parameter starts
	// with `/`, the base url gets prepended, not including the path portion of your baseUrl.
	// If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
	// gets prepended directly.
	//baseUrl: 'http://localhost',
	//
	// Default timeout for all waitFor* commands.
	waitforTimeout: 12000,
	//
	// Default timeout in milliseconds for request
	// if browser driver or grid doesn't send response
	connectionRetryTimeout: 60000,
	//
	// Default request retries count
	connectionRetryCount: 1,
	//
	// Test runner services
	// Services take over a specific job you don't want to take care of. They enhance
	// your test setup with almost no effort. Unlike plugins, they don't add new
	// commands. Instead, they hook themselves up into the test process.
	//services: ['devtools'],
	// Framework you want to run your specs with.
	// The following are supported: Mocha, Jasmine, and Cucumber
	// see also: https://webdriver.io/docs/frameworks
	//
	// Make sure you have the wdio adapter package for the specific framework installed
	// before running any tests.
	framework: 'jasmine',
	//
	// The number of times to retry the entire specfile when it fails as a whole
	specFileRetries: 0,
	//
	// Delay in seconds between the spec file retry attempts
	// specFileRetriesDelay: 0,
	//
	// Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
	// specFileRetriesDeferred: false,
	//
	// Test reporter for stdout.
	// The only one supported by default is 'dot'
	// see also: https://webdriver.io/docs/dot-reporter
	reporters: [
		[
			'spec',
			{
				symbols: {
					passed: '[PASS]',
					failed: '[FAIL]',
				},
				addConsoleLogs: true,
				realtimeReporting: true,
			},
		],
		[
			'allure',
			{
				outputDir: 'test/.artifacts/allure-results/',
				disableWebdriverStepsReporting: true,
				disableWebdriverScreenshotsReporting: false,
			},
		],

		//[ExcelReporter, { outputFile: 'test/.artifacts/test-results.xlsx' }],
		[JSONReporter, { outputFile: 'test/.artifacts/json-reports/test-results.json', screenshotOption: 'Full' }], // Options: "No", "OnFailure", "Full"
	],

	//
	// Options to be passed to Mocha.
	// See the full list at http://mochajs.org/
	// Options to be passed to Jasmine.
	jasmineOpts: {
		// onComplete will be called just before the driver quits.
		onComplete: null,

		// If true, display spec names.
		isVerbose: false,

		// If true, print colors to the terminal.̦
		showColors: true,

		// If true, include stack traces in failures.
		includeStackTrace: true,

		// If an 'it' block takes longer than the timeout for any reason (even legitimate), it will fail
		defaultTimeoutInterval: 2 * 60 * 1000,

		print() {},
		//
		// The Jasmine framework allows interception of each assertion in order to log the state of the application
		// or website depending on the result. For example, it is pretty handy to take a screenshot every time
		// an assertion fails.
		expectationResultHandler(passed, assertion) {
			// if (!passed) debugger;
		},
	},
	//
	// =====
	// Hooks
	// =====
	// WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
	// it and to build services around it. You can either apply a single function or an array of
	// methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
	// resolved to continue.
	/**
	 * Gets executed once before all workers get launched.
	 * @param {Object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 */
	onPrepare(config, capabilities) {
		const dir = 'test/.artifacts';
		try {
			if (!existsSync(tmpFilesPath)) {
				mkdirSync(tmpFilesPath);
			}
		} catch (err) {
			console.error(err);
		}

		// delete directory recursively
		if (existsSync(dir)) {
			rm(dir, { recursive: true }, err => {
				if (err) {
					throw err;
				}
				console.log(`${dir} artifacts is cleared`);
			});
		} else {
			console.log('artifacts is cleared');
		}
	},
	/**
	 * Gets executed before a worker process is spawned and can be used to initialise specific service
	 * for that worker as well as modify runtime environments in an async fashion.
	 * @param  {String} cid      capability id (e.g 0-0)
	 * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
	 * @param  {[type]} specs    specs to be run in the worker process
	 * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
	 * @param  {[type]} execArgv list of string arguments passed to the worker process
	 */
	onWorkerStart(cid, caps, specs, args, execArgv) {},
	/**
	 * Gets executed just before initialising the webdriver session and test framework. It allows you
	 * to manipulate configurations depending on the capability or spec.
	 * @param {Object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs List of spec file paths that are to be run
	 * @param {String} cid worker id (e.g. 0-0)
	 */
	// beforeSession: function (config, capabilities, specs, cid) {
	// },
	/**
	 * Gets executed before test execution begins. At this point you can access to all global
	 * variables like `browser`. It is the perfect place to define custom commands.
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs        List of spec file paths that are to be run
	 * @param {Object}         browser      instance of created browser/device session
	 */
	// before: function (capabilities, specs) {
	// },
	/**
	 * Runs before a WebdriverIO command gets executed.
	 * @param {String} commandName hook command name
	 * @param {Array} args arguments that command would receive
	 */
	// beforeCommand: function (commandName, args) {
	// },
	/**
	 * Hook that gets executed before the suite starts
	 * @param {Object} suite suite details
	 */
	// beforeSuite: function (suite) {
	// },
	/**
	 * Function to be executed before a test (in Mocha/Jasmine) starts.
	 */
	// beforeTest: async function (test, context) {
	//  apiCalls = await browser.mock('**');
	// },
	/**
	 * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
	 * beforeEach in Mocha)
	 */
	// beforeHook: function (test, context) {
	// },
	/**
	 * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
	 * afterEach in Mocha)
	 */
	// afterHook: function (test, context, { error, result, duration, passed, retries }) {
	// },
	/**
	 * Function to be executed after a test (in Mocha/Jasmine only)
	 * @param {Object}  test             test object
	 * @param {Object}  context          scope object the test was executed with
	 * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
	 * @param {Any}     result.result    return object of test function
	 * @param {Number}  result.duration  duration of test
	 * @param {Boolean} result.passed    true if test has passed, otherwise false
	 * @param {Object}  result.retries   informations to spec related retries, e.g. `{ attempts: 0, limit: 0 }`
	 */
	async afterTest(test, context, { error, result, duration, passed, retries }) {
		{
			await browser.takeScreenshot();
		}
	},

	/**
	 * Hook that gets executed after the suite has ended
	 * @param {Object} suite suite details
	 */
	// afterSuite: function (suite) {
	// },
	/**
	 * Runs after a WebdriverIO command gets executed
	 * @param {String} commandName hook command name
	 * @param {Array} args arguments that command would receive
	 * @param {Number} result 0 - command success, 1 - command error
	 * @param {Object} error error object if any
	 */
	// afterCommand: function (commandName, args, result, error) {
	// },
	/**
	 * Gets executed after all tests are done. You still have access to all global variables from
	 * the test.
	 * @param {Number} result 0 - test pass, 1 - test fail
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs List of spec file paths that ran
	 */
	// after: function (result, capabilities, specs) {
	// },
	/**
	 * Gets executed right after terminating the webdriver session.
	 * @param {Object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs List of spec file paths that ran
	 */
	// afterSession: function (config, capabilities, specs) {
	// },
	/**
	 * Gets executed after all workers got shut down and the process is about to exit. An error
	 * thrown in the onComplete hook will result in the test run failing.
	 * @param {Object} exitCode 0 - success, 1 - fail
	 * @param {Object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {<Object>} results object containing test results
	 */
	async onComplete(exitCode, config, capabilities) {
		const reportError = new Error('Could not generate Allure report');
		const generation = allure(['generate', 'test/.artifacts/allure-results', , '--report-dir', 'test/.artifacts/allure-report']);
		// Generate the Allure report and convert the results to CSV inside a Promise chain
		await converter.convertJSONFolderToExcel('test/.artifacts/json-reports');
		// Creating HTML report
		await reportGenerator.convertJSONFolderToHTML('test/.artifacts/json-reports');

		//Geneating a text-formatted report summary for use in the GitHub job summary
		converter.writeSummaryInTextFile('./test/.artifacts');

		return new Promise((resolve, reject) => {
			const generationTimeout = setTimeout(() => reject(reportError), 60000);

			generation.on('exit', exitCode => {
				clearTimeout(generationTimeout);

				if (exitCode !== 0) {
					return reject(reportError);
				}

				console.log('Allure report successfully generated');
				resolve();
			});
		});
	},
	/**
	 * Gets executed when a refresh happens.
	 * @param {String} oldSessionId session ID of the old session
	 * @param {String} newSessionId session ID of the new session
	 */
	//onReload: function(oldSessionId, newSessionId) {
	//}
};
