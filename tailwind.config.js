module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    enabled: true,
    content: ['./pages/**/*.js', './components/**/*.js'], 
  },
  theme: {
    extend: {
      colors: {
        primary: '#17150F',
        secondary: '#F7F7F2'
      }
    }
  },
  variants: {},
  plugins: []
}
