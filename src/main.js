import { createApp } from 'vue'
import App from './App.vue'
import SvgIcon from "vue3-icon"

createApp(App)
  .component('svg-icon', SvgIcon)
  .mount('#app')
