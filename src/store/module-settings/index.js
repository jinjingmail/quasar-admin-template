import defaultSetting from '@/default-setting'
import defaultColor from '@/default-color'
import { LocalStorage, Dark, colors } from 'quasar'

function get (key, default_ = null) {
  const v = LocalStorage.getItem(key)
  if (v != null && v !== undefined) {
    return v
  } else {
    return default_
  }
}
function set (key, value) {
  if (key.startsWith('setting.color')) {
    setColor(key, value)
  } else {
    LocalStorage.set(key, value)
    if (key === 'setting.darkMode') {
      if (value) {
        Dark.set(true)
      } else {
        Dark.set(false)
      }
      /*
       * dark模式要切换css变量值
       */
      loadColorToDom()
    }
  }
}

function loadColorToDom() {
  let color = getters.colorPrimary(state)
  if (color) colors.setBrand('primary', color)

  color = getters.colorMenuBgActive(state)
  if (color) colors.setBrand('menu-bg-active', color)

  color = getters.colorPageBg(state)
  if (color) colors.setBrand('page-bg', color)

  color = getters.colorTableBg(state)
  if (color) colors.setBrand('table-bg', color)

  color = getters.colorOtherBg(state)
  if (color) colors.setBrand('other-bg', color)
}

function getColor (key, default_ = null) {
  const v = LocalStorage.getItem(key)
  if (v != null) {
    return v
  } else {
    return default_
  }
}
function setColor (key, value) {
  LocalStorage.set(key, value)
  if (key.startsWith('setting.colorPrimary')) {
    colors.setBrand('primary', value)
  }
  if (key.startsWith('setting.colorMenuBgActive')) {
    colors.setBrand('menu-bg-active', value)
  }
  if (key.startsWith('setting.colorPageBg')) {
    colors.setBrand('page-bg', value)
  }
  if (key.startsWith('setting.colorTableBg')) {
    colors.setBrand('table-bg', value)
  }
  if (key.startsWith('setting.colorOtherBg')) {
    colors.setBrand('other-bg', value)
  }
}

const state = {
  title: defaultSetting.title,
  footerTxt: defaultSetting.footerTxt,
  caseNumber: defaultSetting.caseNumber,

  pageSize: get('setting.pageSize', defaultSetting.pageSize),

  tagsView: get('setting.tagsView', defaultSetting.tagsView),
  tagsViewTop: get('setting.tagsViewTop', defaultSetting.tagsViewTop),
  fixedHeader: get('setting.fixedHeader', defaultSetting.fixedHeader),
  elevatedHeader: get('setting.elevatedHeader', defaultSetting.elevatedHeader),
  elevatedSidebar: get('setting.elevatedSidebar', defaultSetting.elevatedSidebar),
  sidebarLogo: get('setting.sidebarLogo', defaultSetting.sidebarLogo),
  sidebarTop: get('setting.sidebarTop', defaultSetting.sidebarTop),
  sidebarWidth: get('setting.sidebarWidth', defaultSetting.sidebarWidth),
  sidebarMini: get('setting.sidebarMini', defaultSetting.sidebarMini),
  uniqueOpened: get('setting.uniqueOpened', defaultSetting.uniqueOpened),
  showFooter: get('setting.showFooter', defaultSetting.showFooter),
  darkMode: get('setting.darkMode', defaultSetting.darkMode),
  denseMode: get('setting.denseMode', defaultSetting.denseMode),
  inputDesignMode: get('setting.inputDesignMode', defaultSetting.inputDesignMode),
  inputDesignCorner: get('setting.inputDesignCorner', defaultSetting.inputDesignCorner),
  btnDesignMode: get('setting.btnDesignMode', defaultSetting.btnDesignMode),
  btnDesignCorner: get('setting.btnDesignCorner', defaultSetting.btnDesignCorner),
  pageBgImage: get('setting.pageBgImage', defaultSetting.pageBgImage),

  colorPrimary: getColor('setting.colorPrimary', null),
  colorPrimaryDark: getColor('setting.colorPrimaryDark', null),
  colorHeaderBg1: getColor('setting.colorHeaderBg1', defaultColor.colorHeaderBg1),
  colorHeaderBg1Dark: getColor('setting.colorHeaderBg1Dark', defaultColor.colorHeaderBg1Dark),
  colorHeaderBg2: getColor('setting.colorHeaderBg2', defaultColor.colorHeaderBg2),
  colorHeaderBg2Dark: getColor('setting.colorHeaderBg2Dark', defaultColor.colorHeaderBg2Dark),
  colorHeaderText: getColor('setting.colorHeaderText', defaultColor.colorHeaderText),
  colorHeaderTextDark: getColor('setting.colorHeaderTextDark', defaultColor.colorHeaderTextDark),
  colorMenuBg: getColor('setting.colorMenuBg', defaultColor.colorMenuBg),
  colorMenuBgDark: getColor('setting.colorMenuBgDark', defaultColor.colorMenuBg),
  colorMenuText: getColor('setting.colorMenuText', defaultColor.colorMenuText),
  colorMenuTextDark: getColor('setting.colorMenuTextDark', defaultColor.colorMenuText),
  colorMenuBgActive: getColor('setting.colorMenuBgActive', defaultColor.colorMenuBgActive),
  colorMenuBgActiveDark: getColor('setting.colorMenuBgActiveDark', defaultColor.colorMenuBgActive),
  colorPageBg: getColor('setting.colorPageBg', defaultColor.colorPageBg),
  colorPageBgDark: getColor('setting.colorPageBgDark', defaultColor.colorPageBgDark),
  colorTableBg: getColor('setting.colorTableBg', defaultColor.colorTableBg),
  colorTableBgDark: getColor('setting.colorTableBgDark', defaultColor.colorTableBgDark),
  colorOtherBg: getColor('setting.colorOtherBg', defaultColor.colorOtherBg),
  colorOtherBgDark: getColor('setting.colorOtherBgDark', defaultColor.colorOtherBgDark)
}

const getters = {
  title: state => state.title,
  footerTxt: state => state.footerTxt,
  caseNumber: state => state.caseNumber,

  pageSize: state => state.pageSize,

  tagsView: state => state.tagsView,
  tagsViewTop: state => state.tagsViewTop,
  fixedHeader: state => state.fixedHeader,
  elevatedHeader: state => state.elevatedHeader,
  elevatedSidebar: state => state.elevatedSidebar,
  sidebarLogo: state => state.sidebarLogo,
  sidebarTop: state => state.sidebarTop,
  sidebarWidth: state => state.sidebarWidth,
  sidebarMini: state => state.sidebarMini,
  uniqueOpened: state => state.uniqueOpened,
  showFooter: state => state.showFooter,
  darkMode: state => state.darkMode,
  denseMode: state => state.denseMode,
  inputDesignMode: state => state.inputDesignMode,
  inputDesignCorner: state => state.inputDesignCorner,
  btnDesignMode: state => state.btnDesignMode,
  btnDesignCorner: state => state.btnDesignCorner,
  pageBgImage: state => state.pageBgImage,

  colorPrimary: state => Dark.isActive ? state.colorPrimaryDark : state.colorPrimary,
  colorHeaderBg1: state => Dark.isActive ? state.colorHeaderBg1Dark : state.colorHeaderBg1,
  colorHeaderBg2: state => Dark.isActive ? state.colorHeaderBg2Dark : state.colorHeaderBg2,
  colorHeaderText: state => Dark.isActive ? state.colorHeaderTextDark : state.colorHeaderText,
  colorMenuBg: state => Dark.isActive ? state.colorMenuBgDark : state.colorMenuBg,
  colorMenuText: state => Dark.isActive ? state.colorMenuTextDark : state.colorMenuText,
  colorMenuBgActive: state => Dark.isActive ? state.colorMenuBgActiveDark : state.colorMenuBgActive,
  colorPageBg: state => Dark.isActive ? state.colorPageBgDark : state.colorPageBg,
  colorTableBg: state => Dark.isActive ? state.colorTableBgDark : state.colorTableBg,
  colorOtherBg: state => Dark.isActive ? state.colorOtherBgDark : state.colorOtherBg
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state[key] !== undefined || state[key] !== null) {
      let newKey = key
      if (key.startsWith('color')) {
        if (Dark.isActive) {
          newKey = key + 'Dark'
        }
      }
      state[newKey] = value
      set('setting.' + newKey, value)
    }
  }
}

const actions = {
  init ({ commit }) {
    console.log('state: do setting init')
    /*
     * 通过commit darkmode，间接更新颜色css变量
     */
    if (getters.darkMode(state)) {
      commit('CHANGE_SETTING', { key: 'darkMode', value: true })
    } else {
      commit('CHANGE_SETTING', { key: 'darkMode', value: false })
    }
    /*
    if (getters.colorMenuBgActive(state)) {
      const color = getters.colorMenuBgActive(state)
      commit('CHANGE_SETTING', { key: 'colorMenuBgActive', value: color })
    }*/
  },
  changeSetting ({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  restoreSetting ({ commit }, data) {
    if (data === 'colorMenu') {
      commit('CHANGE_SETTING', { key: 'colorMenuBg', value: defaultColor.colorMenuBg })
      commit('CHANGE_SETTING', { key: 'colorMenuText', value: defaultColor.colorMenuText })
      commit('CHANGE_SETTING', { key: 'colorMenuBgActive', value: defaultColor.colorMenuBgActive })
    } else if (data === 'colorHeader') {
      commit('CHANGE_SETTING', { key: 'colorHeaderBg1', value: (Dark.isActive ? defaultColor.colorHeaderBg1Dark : defaultColor.colorHeaderBg1) })
      commit('CHANGE_SETTING', { key: 'colorHeaderBg2', value: (Dark.isActive ? defaultColor.colorHeaderBg2Dark : defaultColor.colorHeaderBg2) })
      commit('CHANGE_SETTING', { key: 'colorHeaderText', value: (Dark.isActive ? defaultColor.colorHeaderTextDark : defaultColor.colorHeaderText) })
    } else if (data === 'colorPage') {
      commit('CHANGE_SETTING', { key: 'colorPageBg', value: (Dark.isActive ? defaultColor.colorPageBgDark : defaultColor.colorPageBg) })
      commit('CHANGE_SETTING', { key: 'colorTableBg', value: (Dark.isActive ? defaultColor.colorTableBgDark : defaultColor.colorTableBg) })
      commit('CHANGE_SETTING', { key: 'colorOtherBg', value: (Dark.isActive ? defaultColor.colorOtherBgDark : defaultColor.colorOtherBg) })
    } else {
      console.log('unknown restoreSetting:', data)
    }
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}
