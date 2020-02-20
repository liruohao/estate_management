<template>
  <div class='tinymce'>
    <div>
      <editor height="20%" id='tinymce'  v-model='tinymceHtml'  :init='init'></editor>
    </div>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
export default {
  name: 'tinymce',
  data () {
    return {
      value: '',
      //富文本编辑器内容
      tinymceHtml: '请输入内容',
      init: {
        language_url: '/static/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/lightgray',
        height: 300,
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
        toolbar:
            'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: false
      }
    }
  },
  mounted () {
    tinymce.init({
      theme : "advanced",
      readonly : 0,
    })
  },
  components: {Editor}
}

</script>

<style scoped>
  .inputsty{
    margin-bottom: 10px;
  }
</style>
