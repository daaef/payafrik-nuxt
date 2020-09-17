import Vue from 'vue'
import iView from 'iview'
import locale from 'iview/dist/locale/en-US'
import VueCountryCode from "vue-country-code";

Vue.use(VueCountryCode);
Vue.use(iView, {
  locale
})
