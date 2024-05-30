const { override, addBabelPlugin, addDecoratorsLegacy } = require('customize-cra');

module.exports = override(
  addDecoratorsLegacy(),
  addBabelPlugin(['@babel/plugin-proposal-class-properties', { 'loose': true }])
);