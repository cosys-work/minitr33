module.exports = {
  prefix: 'tw',
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}']
  },
  corePlugins: {
    preflight: false,
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
