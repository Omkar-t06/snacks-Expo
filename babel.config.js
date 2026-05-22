module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // CRITICAL: This plugin MUST look exactly like this and remain at the end!
      'react-native-reanimated/plugin', 
    ],
  };
};