module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({ test: /\.html$/i, use: "raw-loader" });

    return config;
  },
};
