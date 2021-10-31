import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 本地存储token
const TOKEN_KEY = "TOUTIAO_USER"
import {setItem,getItem} from '@/utils/storage.js'
export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      //持久化存入本地存储
      setItem(TOKEN_KEY,state.user)
    }
    
  },
  actions: {
  },
  modules: {
  }
})
