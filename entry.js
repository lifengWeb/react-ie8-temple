/**
 * CANNOT use `import` to import `es5-shim`,
 * because `import` will be transformed to `Object.defineProperty` by babel,
 * `Object.defineProperty` doesn't exists in IE8,
 * (but will be polyfilled after `require('es5-shim')` executed).
 */
//项目入口文件

//兼容ie8
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

require('es6-promise');
require('fetch-ie8');
require('core-js/fn/object/assign');
require ('babel-polyfill');
require ('html5shiv');
/**
 * CANNOT use `import` to import `react` or `react-dom`,
 * because `import` will run `react` before `require('es5-shim')`.
 */
// import React from 'react';
// import ReactDOM from 'react-dom';

// const React = require('react');
// const ReactDOM = require('react-dom');
require('antd/dist/antd.css');
// const Button = require('antd/lib/button');
require('./src/router');
require('./src/asset/css/common.css');
require('./src/asset/css/font.css');