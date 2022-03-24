import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { faUserSecret, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add([faUserSecret, faDollarSign, faEthereum])

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
