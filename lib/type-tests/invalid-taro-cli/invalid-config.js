"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    projectName: 'invalid-config',
    date: '2026-7-21',
    designWidth: '750',
    deviceRatio: { 750: 'double' },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [123],
    defineConstants: { FEATURE_FLAG: true },
    copy: {
        patterns: [{ from: 42, to: 'dist/assets' }],
        options: { ignore: 42 }
    },
    framework: 'react',
    compiler: 'webpack5',
    cache: { enable: 'never' },
    sass: { resource: 42, data: false },
    alias: { '@': 42 },
    mini: {
        postcss: {
            pxtransform: { enable: 'yes', config: {} },
            cssModules: {
                enable: 'no',
                config: { namingPattern: 'invalid', generateScopedName: 42 }
            }
        },
        webpackChain(chain) {
            chain.resolve.plugin('broken').wrongMethod();
        }
    },
    h5: {
        publicPath: 42,
        staticDirectory: false,
        output: { filename: 42, chunkFilename: false },
        miniCssExtractPluginOption: {
            ignoreOrder: 'yes',
            filename: 42,
            chunkFilename: false
        },
        webpackChain(chain) {
            chain.plugin('broken').wrongMethod();
        }
    },
    rn: {
        appName: false,
        postcss: { cssModules: { enable: 'no' } }
    }
};
//# sourceMappingURL=invalid-config.js.map