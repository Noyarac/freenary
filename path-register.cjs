// Runtime alias resolver for compiled JS in /dist
const path = require('path');
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = path.join(__dirname, 'dist');
tsConfigPaths.register({
  baseUrl,
  // Mirror tsconfig paths: "@/*": ["./*"] -> point to dist with ["*"]
  paths: { '@/*': ['*'] },
});
