import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import RichText from '@/components/RichText'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RichText',
      component: RichText
    }
  ]
})
