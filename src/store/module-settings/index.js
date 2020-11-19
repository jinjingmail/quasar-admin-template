import defaultSetting from '../../default-setting'
import { LocalStorage } from 'quasar'

function get (key, default_) {
  const v = LocalStorage.getItem(key)
  if (v != null) {
    return v
  } else {
    return default_
  }
}
function set (key, value) {
  LocalStorage.set(key, value)
}

const state = {
  tagsView: get('setting.tagsView', defaultSetting.tagsView),
  tagsViewTop: get('setting.tagsViewTop', defaultSetting.tagsViewTop),
  fixedHeader: get('setting.fixedHeader', defaultSetting.fixedHeader),
  sidebarLogo: get('setting.sidebarLogo', defaultSetting.sidebarLogo),
  sidebarTop: get('setting.sidebarTop', defaultSetting.sidebarTop),
  uniqueOpened: get('setting.uniqueOpened', defaultSetting.uniqueOpened),
  showFooter: get('setting.showFooter', defaultSetting.showFooter),
  footerTxt: get('setting.footerTxt', defaultSetting.footerTxt),
  caseNumber: get('setting.caseNumber', defaultSetting.caseNumber)
}

const getters = {
  tagsView: state => state.tagsView,
  tagsViewTop: state => state.tagsViewTop,
  fixedHeader: state => state.fixedHeader,
  sidebarLogo: state => state.sidebarLogo,
  sidebarTop: state => state.sidebarTop,
  uniqueOpened: state => state.uniqueOpened,
  showFooter: state => state.showFooter,
  footerTxt: state => state.footerTxt,
  caseNumber: state => state.caseNumber
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state[key] !== undefined || state[key] !== null) {
      state[key] = value
      set('setting.' + key, value)
    }
  }
}

const actions = {
  changeSetting ({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}
