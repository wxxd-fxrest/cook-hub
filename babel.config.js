module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: ['react-native-reanimated/plugin'], // 이 부분 추가
  };
};