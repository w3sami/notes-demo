module.exports = function (config) {
    config.set({
        client: {
            captureConsole: true
        },
        basePath: '',
        frameworks: ['jasmine', 'commonjs'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'ts/**/*.js',
            'html/*.html'
        ],
        preprocessors: {
            'html/*.html': 'ng-html2js'
        },

        ngHtml2JsPreprocessor: {
            moduleName: 'templates'
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_WARN,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        captureTimeout: 20000,
        singleRun: false,
        reportSlowerThan: 500,

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-commonjs',
            'karma-coverage',
            'karma-ng-html2js-preprocessor',
            'karma-spec-reporter'
        ],

        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--disable-gpu',
                    // Without a remote debugging port, Google Chrome exits immediately.
                    '--remote-debugging-port=9222',
                ]
            }
        }
    });
};
