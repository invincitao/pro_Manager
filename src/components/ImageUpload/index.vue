<template>
  <div>
    <el-upload
      list-type="picture-card"
      action="#"
      :file-list="fileList"
      :on-preview="preview"
      :class="{disable:fileList.length>0}"
      :on-remove="onRemove"
      :on-change="onChange"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible="showDialog" title="预览" @close="showDialog = false">
      <el-row type="flex" justify="center">
        <img :src="previewURL" alt="">
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          url: 'https://img0.baidu.com/it/u=2648200177,1699089516&fm=11&fmt=auto&gp=0.jpg'
        }
      ],
      previewURL: '',
      showDialog: false
    }
  },
  methods: {
    // 点击看图片
    preview(file) {
      console.log(file)
      this.previewURL = file.url
      this.showDialog = true
    },
    // 删除
    onRemove(file, fileList) {
      this.fileList = [...fileList]
    },
    // 改变
    onChange(file, fileList) {
      this.fileList = [...fileList]
    },
    // 覆盖原来的默认上传行为
    upload(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .disable{
  .el-upload--picture-card{
    display: none;
  }
}
::v-deep img{
  object-fit: cover;
}
</style>
