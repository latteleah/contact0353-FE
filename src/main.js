import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from '@/plugins/axios'
import './assets/main.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import FomanticUI from 'vue-fomantic-ui'
import 'fomantic-ui-css/semantic.min.css'

const vuetify = createVuetify({
    components,
    directives,
})


const app = createApp(App)

app.use(router)
app.use(axios)
app.use(vuetify)
app.use(FomanticUI)

app.mount('#app')
