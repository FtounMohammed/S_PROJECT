import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'leader-line-new';

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import "vue-organization-chart/dist/orgchart.css";
import OrganizationChart from "vue-organization-chart";

Vue.component("organization-chart", OrganizationChart);

Vue.use(PrimeVue);
import Vue2OrgTree from 'vue2-org-tree'
import 'vue2-org-tree/dist/style.css'

Vue.use(Vue2OrgTree)


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

