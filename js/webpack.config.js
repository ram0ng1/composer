const config = require('flarum-webpack-config')();

// IDs nomeados: os numéricos (padrão do webpack) colidem com os de outras
// extensões no `webpackChunkmodule_exports` global.
config.optimization = config.optimization || {};
config.optimization.moduleIds = 'named';
config.optimization.chunkIds = 'named';

module.exports = config;
