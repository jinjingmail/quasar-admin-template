import Setting from '@/default-setting'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default ({ app, router, store, Vue }) => {
  const denseStore = store.getters['settings/denseMode']
  Setting.denseMode = denseStore
}
