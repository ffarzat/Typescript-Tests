var confs = createConfigurations();

var async = require('async');
var karma = require('karma');


function getConfiguration(filename) {
    return {
        // you can enrich the template file here if you want
        // e.g. add some preprocessor based on the configuration, etc..
        //
        // if not set in the config template 
        // make Karma server launch the runner as well
        singleRun: true,
        // point to the template
        configFile: __dirname + filename
    };
}

function getLodashConfig() {
    return {
        // you can enrich the template file here if you want
        // e.g. add some preprocessor based on the configuration, etc..
        //
        // if not set in the config template 
        // make Karma server launch the runner as well
        singleRun: true,
        // point to the template
        //configFile: __dirname + filename
        frameworks: ['qunit'],
        plugin: ['karma-qunit'],
        browsers: ['Chrome'],

        // list of files / patterns to load in the browser
        files: [
            __dirname + '/lodash/lodash.js',
            __dirname + '/lodash/lodashTest.js'
        ],
        reporters: ['progress'],

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        // client configuration
        client: {
            qunit: {
                testTimeout: 5000
            }
        }
    };
}

function createConfigurations() {
    return [getConfiguration('/lodash/karma.conf.js'), getConfiguration('/underscore/karma.conf.js'), getConfiguration('/moment/karma.conf.js')];
}

function startKarma(conf, next) {
    karma.server.start(conf, function (exitCode) {
        // exit code === 0 is OK
        if (!exitCode) {
            console.log('\tTests ran successfully.\n');
            // rerun with a different configuration
            next();
        } else {
            // just exit with the error code
            next(exitCode);
        }
    });
}


async.eachSeries(confs, startKarma, function (err) {
    if (err) {
        console.log('Erro ao executar os testes - Fit Bem alta');
    }
  else {
        console.log('Testes executados com sucesso');
        //process.exit();
        }
    });