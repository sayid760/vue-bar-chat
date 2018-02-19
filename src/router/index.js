import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/chat'
import zuj from '@/components/zuj'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/zuj',
      name: 'zuj',
      component: zuj
    }
  ]
})
