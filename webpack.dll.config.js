const path = require('path');
const webpack = require('webpack');

const {VERSION} = require('./config');

// MAJOR_VERSION.MINOR_VERSION.PATCH_VERSION
const MAJOR_VERSION = VERSION.split('.')[0];
const MINOR_VERSION = VERSION.split('.')[1];
const PATCH_VERSION = VERSION.split('.')[2];

const VENDORS = [
  'react', 'react-dom', 'redux',
  'react-redux', 'redux-immutable', 'react-router',
  'react-router-redux', 'moment',
  'axios', 'rxjs', 'lodash',
];

const LIBRARY_NAME = `vendor_library_v${MAJOR_VERSION}_[chunkhash:8]`;

module.exports = {
  entry: {
    vendor: VENDORS,
  },
  output: {
    path: path.join(__dirname, 'release/dist'),
    filename: `vendor.${MAJOR_VERSION}.[chunkhash:8].dist.js`,
    publicPath: './dist/',
    library: LIBRARY_NAME,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compressor: {
        sequences: false,     // join consecutive statemets with the “comma operator”
        properties: false,    // optimize property access: a['foo'] → a.foo
        dead_code: false,     // discard unreachable code
        drop_debugger: true,  // discard “debugger” statements
        unsafe: false,        // some unsafe optimizations (see below)
        conditionals: true,   // optimize if-s and conditional expressions
        comparisons: true,    // optimize comparisons
        evaluate: false,      // evaluate constant expressions
        booleans: true,       // optimize boolean expressions
        loops: true,          // optimize loops
        unused: true,         // drop unused variables/functions
        hoist_funs: true,     // hoist function declarations
        hoist_vars: true,     // hoist variable declarations
        if_return: true,      // optimize if-s followed by return/continue
        join_vars: true,      // join var declarations
        cascade: false,       // try to cascade `right` into `left` in sequences
        side_effects: false,  // drop side-effect-free statements
        warnings: true,       // warn about potentially dangerous optimizations/code
        global_defs: {},       // global definitions
      },
    }),
    new webpack.DllPlugin({
      path: 'vendorDLL.json',
      name: LIBRARY_NAME,
      context: __dirname,
    }),
  ],
};
