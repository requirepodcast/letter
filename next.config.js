module.exports = {
  webpack: config => {
    config.module.rules.push({ test: /\.pug/, use: "pug-loader" });

    return config;
  },
};
