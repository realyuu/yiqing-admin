import { login, logout, getInfo, modify } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  realname: '',
  avatar: '',
  introduction: '',
  roles: '',   //原版里是一个数组
  telephone: '',
  email: '',
  id: '',
  username: '',
  superpassword: '',
  major:''
}

const mutations = {
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.realname = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
      // let  _roles = roles.split(',')
      // _roles.forEach(r => {
      //   state.roles.push(r)
      // })
  },
  REMOVE_ROLES: (state) => {
    state.roles = ''
    // state.roles.splice(0,state.roles.length);
  },
  SET_PHONE: (state, phone) => {
    state.telephone = phone
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_SP: (state, superpassword) => {
    state.superpassword = superpassword
  },
  SET_MAJOR: (state, major) => {
    state.major = major
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  modify({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      const {realname, telephone, email} = userInfo
      commit('SET_NAME', realname)
      commit('SET_PHONE', telephone)
      commit('SET_EMAIL', email)
      modify(userInfo).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        // console.log(data.userinfo)
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { id, roles, realname, avatar, description, email, telephone, username, password, major  } = data.userinfo
        //console.log({ roles, realname, avatar, description })
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('暂无分配权限 getInfo: roles must be a non-null array!')
        }
        commit('SET_ID', id)
        commit('SET_ROLES', roles)
        commit('SET_NAME', realname)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', description)
        commit('SET_EMAIL', email)
        commit('SET_PHONE', telephone)
        commit('SET_USERNAME', username)
        commit('SET_SP', password)
        commit('SET_MAJOR', major)
        // console.log({ roles, realname, avatar, description, email, telephone, username })
        resolve(data.userinfo)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('REMOVE_ROLES')
      removeToken()
      resetRouter()
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()

      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   commit('SET_ROLES', [])
      //   removeToken()
      //   resetRouter()
      //
      //   // reset visited views and cached views
      //   // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      //   dispatch('tagsView/delAllViews', null, { root: true })
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('REMOVE_ROLES')
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
