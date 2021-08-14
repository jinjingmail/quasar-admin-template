<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import drag from './utils/vue-dragdrag'
Vue.directive('drag', drag)

// 权限指令
import permission from 'components/permission/index'
Vue.use(permission)

import CoTable from 'components/co-table'
import CoDialog from 'components/co-dialog'
import CoCard from 'components/co-card'
import CoTree from 'components/co-tree'
import CoBtn from 'components/co-btn'
import CoBtnDropdown from 'components/co-btn-dropdown'
import CoBtnGroup from 'components/co-btn-group'
import CoPagination from 'components/co-pagination'

import CoField from 'components/form/co-field.vue'
import CoInput from 'components/form/co-input.vue'
import CoFile from 'components/form/co-file.vue'
import CoDate from 'components/form/co-date.vue'
import CoOptionGroup from 'components/form/co-option-group.vue'
import CoSelect from 'components/form/co-select.vue'
import CoFormItem from 'components/form/co-form-item.vue'
import CoForm from 'components/form/co-form.vue'
import CoDateSelect from 'components/form/co-date-select.vue'
import CoTreeSelect from 'components/form/co-tree-select.vue'
import CoCheckbox from 'components/form/co-checkbox.vue'
import CoRadio from 'components/form/co-radio.vue'
import CoToggle from 'components/form/co-toggle.vue'
import CoBtnToggle from 'components/form/co-btn-toggle.vue'
import CoSlider from 'components/form/co-slider.vue'
import CoRange from 'components/form/co-range.vue'

Vue.component(CoTable.name, CoTable)
Vue.component(CoDialog.name, CoDialog)
Vue.component(CoCard.name, CoCard)
Vue.component(CoTree.name, CoTree)
Vue.component(CoBtn.name, CoBtn)
Vue.component(CoBtnDropdown.name, CoBtnDropdown)
Vue.component(CoBtnGroup.name, CoBtnGroup)
Vue.component(CoPagination.name, CoPagination)

Vue.component(CoField.name, CoField)
Vue.component(CoInput.name, CoInput)
Vue.component(CoFile.name, CoFile)
Vue.component(CoDate.name, CoDate)
Vue.component(CoOptionGroup.name, CoOptionGroup)
Vue.component(CoSelect.name, CoSelect)
Vue.component(CoFormItem.name, CoFormItem)
Vue.component(CoForm.name, CoForm)
Vue.component(CoDateSelect.name, CoDateSelect)
Vue.component(CoTreeSelect.name, CoTreeSelect)
Vue.component(CoCheckbox.name, CoCheckbox)
Vue.component(CoRadio.name, CoRadio)
Vue.component(CoToggle.name, CoToggle)
Vue.component(CoBtnToggle.name, CoBtnToggle)
Vue.component(CoSlider.name, CoSlider)
Vue.component(CoRange.name, CoRange)

export default {
  name: 'App'
}
</script>
