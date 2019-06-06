import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout } from '@/api/account'
import { getUserId, setUserId, removeUserId } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: getUserId(),
    username: ''
  },
  mutations: {
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_USER_NAME: (state, username) => {
      state.username = username
    }
  },
  actions: {
    login ({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password }).then(response => {
          const { content: user } = response
          commit('SET_USER_ID', user.id)
          commit('SET_USER_NAME', user.username)
          setUserId(user.id)
          resolve()
        }).catch(error => reject(error))
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(response => {
          commit('SET_USER_ID', undefined)
          commit('SET_USER_NAME', '')
          removeUserId()
          resolve()
        }).catch(error => reject(error))
      })
    }
  }
})
