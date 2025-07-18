module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      // The following are defaults but good to be aware of
      // blocklist: null,
      // allowlist: null,
      // safe: false,
      // allowUndefined: true,
    }],
  ],
};