import Vue from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import * as VueGoogleMaps from 'vue2-google-maps'

import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'

Vue.use(PrimeVue);
Vue.use(VueGoogleMaps, {
  load: {
    key: '',
    libraries: 'places',
  },
})

new Vue({
	render: (h) => h(App),
}).$mount('#app')