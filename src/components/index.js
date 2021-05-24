import PageTools from '@/components/PageTools/index.vue'
import UploadExcel from '@/components/UploadExcel'
import ImageUpload from '@/components/ImageUpload'
import TagsView from '@/components/TagsView'
import ThemePicker from '@/components/ThemePicker'
import ScreenFull from '@/components/ScreenFull'
import LangSwitch from '@/components/LangSwitch'

export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('TagsView', TagsView)
    Vue.component('ThemePicker', ThemePicker)
    Vue.component('LangSwitch', LangSwitch)
    Vue.component('ScreenFull', ScreenFull)
  }
}
