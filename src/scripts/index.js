import 'regenerator-runtime'
import '../styles/styles.css'
import '../styles/responsive.css'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import 'font-awesome/css/font-awesome.min.css'
import App from './views/app'
import swRegister from './utils/sw-register'

// eslint-disable-next-line no-unused-vars
const START = 10
// eslint-disable-next-line no-unused-vars
const NUMBER_OF_IMAGES = 100

// eslint-disable-next-line no-unused-vars
const app = new App({
  button: document.getElementById('menu-toggle'),
  drawer: document.getElementById('menu'),
  content: document.getElementById('maincontent'),
  loadingIndicator: document.getElementById('loading')
})

window.addEventListener('hashchange', () => {
  app.renderPage()
})

window.addEventListener('load', () => {
  app.renderPage()
  swRegister()
})
