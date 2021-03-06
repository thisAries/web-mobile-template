/* eslint-disable no-new,no-unused-vars,no-param-reassign,no-underscore-dangle */
import '../jslibs/rem'
import Vue from 'vue'
import Cube from 'cube-ui'
import VConsole from 'vconsole'
import wxsdk from './wx-js-sdk'


require('cube-ui/lib/cube.min.css')
require('~/filiters/vue-filiter')


// new VConsole() // 调试窗口
Vue.use(Cube)

Vue.use(wxsdk) // 公众号应用才需使用

Vue.config.errorHandler = (err, vm, info) => {
  console.log(err, 'err')
}


// 防止多次点击指令
Vue.directive('debounce', {
  inserted(el, binding) {
    el._timer = null;

    el.addEventListener('click', () => {
      if (el._timer) {
        clearTimeout(el._timer);
      }

      el._timer = setTimeout(() => {
        binding.value();
      }, 300);
    });
  },
  unbind(el, binding) {
    clearTimeout(el._timer);
    el._timer = null;
  },
});
