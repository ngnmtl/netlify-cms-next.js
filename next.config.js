module.exports = {
  pageExtensions: ['jsx'],

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      ...[
        {
          test: /\.yml$/,
          type: 'json',
          use: 'yaml-loader',
        },
        {
          test: /\.svg$/,
          use: '@svgr/webpack',
        },
      ]
    );
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};
