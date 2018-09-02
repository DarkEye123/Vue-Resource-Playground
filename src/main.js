import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.http.options.root = "https://vue-resource-playground.firebaseio.com/";
Vue.http.interceptors.push((request, next) => {
    console.log("INTERCEPTOR", request);
    // if (request.method == "POST") { //example of method change
    //     request.method = "PUT";
    // }
    next(); // here I could pass a function with a response and "intercept it too"
});

new Vue({
    render: h => h(App)
}).$mount('#app');