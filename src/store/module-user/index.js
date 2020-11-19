const state = {
  username: null
}

const getters = {
  username: state => state.username || '匿名用户',
  isAuthed: state => !!state.username
}

const mutations = {
  LOGIN: (state, { username, password, rememberMe }) => {
    state.username = username
    state.password = password
  },
  LOGOUT: (state) => {
    state.username = null
    state.password = null
  }
}

const actions = {
  login ({ commit }, form) {
    commit('LOGIN', form)
  },
  logout ({ commit }) {
    commit('LOGOUT')
  },
  validate ({ commit, dispatch, state }) {
    if (!state.username) return Promise.resolve(null)
    return Promise.resolve(state.username)
    /*
    return axios.get('/admin/check_token')
      .then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          commit('LOGIN', data.username)
          commit('TOKEN', data.access_token, '24h')
          return data
        } else {
          commit('LOGOUT')
          return null
        }
      }).catch(() => {
        commit('LOGOUT')
        return null
      })
    */
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}
