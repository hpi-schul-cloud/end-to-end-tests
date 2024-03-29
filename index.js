/**
 KlassiTech Automated Testing Tool
 Created by Larry Goddard
 */
/**
 Copyright © klassitech 2016 - Larry Goddard <larryg@klassitech.co.uk>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
'use strict';

const path = require('path'),
	program = require('commander'),
	fs = require('fs-extra'),
	pjson = require('./package.json'),
	cucumber = require('@cucumber/cucumber');

function collectPaths(value, paths) {
	paths.push(value);
	return paths;
}

function parseRemoteArguments(argumentString) {
	if (!argumentString) {
		throw new Error('Expected an argumentString');
	}
	let argSplit = argumentString.split('/');
	let CONFIG = 0;
	let TAGS = 1;
	let parsed = {
		config: argSplit[CONFIG],
		tags: argSplit[TAGS]
	};
	return parsed;
}

/**
 * Setting and Naming the Project Report files Globally
 * @type {string}
 */
let envConfig = require('./runtime/envConfig');
global.reportName = process.env.REPORT_NAME || envConfig.reportName;
global.projectName = process.env.PROJECT_NAME || envConfig.projectName;

/**
 * Create all the required files and folders needed for the framework to function correctly
 * @type {string}
 */
let reports = './reports/',
	fileDnldFldr = './shared-objects/fileDnldFolder/',
	docsFolder = './shared-objects/docs',
	fileName = path.join('./shared-objects/docs/fileName.txt');

fs.ensureDirSync(reports, function(err) {
	if (err) {
		console.log('The Reports Folder has NOT been created: ' + err.stack);
	}
});
fs.ensureDirSync(fileDnldFldr, function(err) {
	if (err) {
		console.log('The File Download Folder has NOT been created: ' + err.stack);
	}
});
fs.ensureDir(docsFolder, function(err) {
	if (err) {
		console.log('The Docs Folder has NOT been created: ' + err.stack);
	}
});
fs.ensureFile(fileName, function(err) {
	if (err) {
		console.log('The fileName File has NOT been created: ' + err.stack);
	}
});

program
	.version(pjson.version)
	.description(pjson.description)
	.option(
		'-b, --browser [optional]',
		'name of browser to use. defaults to chrome',
		/(chrome|edge|firefox|iexplorer|macChrome|macFirefox|safari|tabletGalaxy|tabletiPad|tabletiPadPro)$/i,
		'chrome'
	)
	.option(
		'-c, --context <path>',
		'contextual root path for project-specific features, steps, objects etc',
		'./'
	)
	.option('-d, --disableReport [optional]', 'Disables the auto opening the browser with test report')
	.option('-e, --email [optional]', 'email for sending reports to stakeholders')
	.option('-k, --keepOpenOnError', 'keep Browser open on error')
	.option(
		'-f, --featuresPath <path>',
		'path to feature definitions. defaults to ./features',
		'features'
	)
	.option(
		'-g, --reportName [optional]',
		'basename for report files e.g. use report for report.json',
		global.reportName
	)
	.option(
		'-n, --environment [<path>]',
		'name of environment to run the framework / test in. default to test',
		/^(test|dev|prod)$/i,
		'dev'
	)
	.option(
		'-o, --sharedObjects <paths>',
		'path to shared objects (repeatable). defaults to ./shared-objects',
		collectPaths,
		['shared-objects']
	)
	.option(
		'-p, --pageObjects <path>',
		'path to page objects. defaults to ./page-objects',
		'page-objects'
	)
	.option(
		'-r, --reports <path>',
		'output path to save reports. defaults to ./reports',
		'reports'
	)
	.option(
		'-s, --steps <path>',
		'path to step definitions. defaults to ./step_definitions',
		'step_definitions'
	)
	.option('-t, --tags <tagName>', 'name of tag to run')
	.option(
		'-u, --updateBaselineImage [optional]',
		'automatically update the baseline image after a failed comparison'
	)
	.option(
		'-w, --remoteService [optional]',
		'which remote driver service, if any, should be used e.g. browserstack',
		''
	)
	.option(
		'-x, --extraSettings [optional]',
		'further piped configs split with pipes',
		''
	)
	.parse(process.argv);

program.on('--help', function() {
	console.log(
		'For more details please visit https://github.com/larryg01/klassi-js#readme\n'
	);
});

const programOptions = program.opts();

let settings = {
	projectRoot: programOptions.context,
	reportName: programOptions.reportName,
	browserName: programOptions.browser,
	disableReport: programOptions.disableReport,
	updateBaselineImage: programOptions.updateBaselineImage,
	defaultTimeout: '300000 * 1000', // 5 mins
	remoteService: programOptions.remoteService,
	keepOpenOnError: programOptions.keepOpenOnError
};

if (programOptions.remoteService && programOptions.extraSettings) {
	let additionalSettings = parseRemoteArguments(programOptions.extraSettings);
	settings.remoteConfig = additionalSettings.config;
	/* this approach supports a single string defining both the target config and tags
		e.g. 'win10-chrome/@tag1,@tag2'
	*/
	if (additionalSettings.tags) {
		if (programOptions.tags) {
			throw new Error('Cannot sent two types of tags - either use -x or -t');
		}
		// TODO: test this on multiple tags
		programOptions.tags = additionalSettings.tags;
	}
}

function getProjectPath(objectName) {
	return path.resolve(settings.projectRoot + programOptions[objectName]);
}

let paths = {
	pageObjects: getProjectPath('pageObjects'),
	reports: getProjectPath('reports'),
	featuresPath: getProjectPath('featuresPath'),
	sharedObjects: programOptions.sharedObjects.map(function(item) {
		return path.resolve(settings.projectRoot + item);
	})
};

global.browserName = programOptions.browser;

// expose settings and paths for global use
global.settings = settings;
global.paths = paths;

/**
 * add helpers
 */
const dateTimeHelpers = require('./runtime/helpers/dateTimeHelpers.js');


/**
 *  adding global date function
 */
global.date = dateTimeHelpers.getCurrentDateWithFormat("dd-mm-yyyy");
global.dateStringForFiles = dateTimeHelpers.getDateStringForFiles()


/**
 * store EnvName globally (used within world.js when building driver)
 */
global.envName = programOptions.environment;

/** rewrite command line switches for cucumber
 */
process.argv.splice(2, 100);

/** specify the feature files folder (this must be the first argument for Cucumber)
 */
process.argv.push(paths.featuresPath);

/** add switch to tell cucumber to produce json report files
 */
process.argv.push(
	'-f',
	'@cucumber/pretty-formatter',
	'-f',
	'json:' +
		path.resolve(
			__dirname,
			paths.reports,
			settings.reportName.replace(/ /g, '') + '-' + global.dateStringForFiles + '.json'
		)
);

/** add cucumber world as first required script (this sets up the globals)
 */
process.argv.push('-r', path.resolve(__dirname, './runtime/world.js'));

/** add path to import step definitions
 */
process.argv.push('-r', path.resolve(programOptions.steps));

/** add tag to the scenarios
 */
if (programOptions.tags) {
	process.argv.push('-t', programOptions.tags);
}

/**
 * Lets crash on unhandledRejection
 */
process.on('unhandledRejection', up => { throw up })

/**
 * execute cucumber Cli
 */
global.cucumber = cucumber;

let klassiCli = new (require('@cucumber/cucumber').Cli )({
	argv: process.argv,
	cwd: process.cwd(),
	stdout: process.stdout
});

new Promise(async function(resolve, reject) {
	try {
		klassiCli.run().then(({ success }) => {
			resolve = success ? 0 : 1;
			function exitNow() {
				process.exit(resolve);
			}
			if (process.stdout.write('')) {
				exitNow();
			} else {
				/**
				* write() returned false, kernel buffer is not empty yet...
				*/
				process.stdout.on('drain', exitNow);
			}
		});
	} catch (err) {
		console.log('cucumber end-to-end-tests failed ' + err.message);
		await reject(err);
		throw err;
	}
});
