
import BtRow from './BtRow.vue' // @ is an alias to /src
import BtButton from './BtButton.vue' // @ is an alias to /src
import BtPage from './BtPage.vue' // @ is an alias to /src
import BtInput from './BtInput.vue' // @ is an alias to /src
import BtIcon from './BtIcon.vue' // @ is an alias to /src
import BtModule from './BtModule.vue' // @ is an alias to /src

const BtUI = {
  install (Vue) {
    Vue.component('bt-row', BtRow)
    Vue.component('bt-button', BtButton)
    Vue.component('bt-page', BtPage)
    Vue.component('bt-input', BtInput)
    Vue.component('bt-icon', BtIcon)
    Vue.component('bt-module', BtModule)
  }
}

export default BtUI
