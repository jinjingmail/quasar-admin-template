import Setting from '@/default-setting'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default ({ app, router, store, Vue }) => {
  Setting.denseMode = store.getters['settings/denseMode']
  Setting.inputDesignMode = store.getters['settings/inputDesignMode']
  Setting.inputDesignCorner = store.getters['settings/inputDesignCorner']
  Setting.btnDesignMode = store.getters['settings/btnDesignMode']
  Setting.btnDesignCorner = store.getters['settings/btnDesignCorner']
}
