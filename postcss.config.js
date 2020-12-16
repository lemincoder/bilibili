module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 320,
      viewportHeight: 568,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: ['ignore', 'nav-bar'],
      minPixelValue: 1,
      mediaQuery: false,
      exclude: [/NavBar.vue$/]
    }
  }
}