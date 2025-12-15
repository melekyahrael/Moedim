const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

// Force Metro to resolve react-native-safe-area-context
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
];

// Reset the metro cache completely
config.resetCache = true;

module.exports = config;
