import Vue from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import * as VueGoogleMaps from 'vue2-google-maps'
import axios from 'axios'

import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'

Vue.use(PrimeVue);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD0lEJcF8r5LqpOQMYrE7FXNRwnTB8sciE',
    libraries: 'places',
  },
})


Vue.prototype.$ajax = axios

new Vue({
	render: (h) => h(App),
}).$mount('#app')