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
      :before-upload="beforeUpload"
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
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDoaAYlmcHpEap0yjHerreHl5YxDJBrKag',
  SecretKey: '0zrkjYBbquzzoTwCF5lGYcT6WimngNr7'
})
export default {
  data() {
    return {
      fileList: [],
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
    // 上传前
    beforeUpload(file) {
      // 设置上传图片的大小
      const maxSize = 20000 * 1024
      if (file.size > maxSize) {
        this.$message.warning('图片太大，上传不成功')
        return false
      }
      // 设置类型
      const acceptType = ['image/jpeg', 'image/jpg']
      if (!acceptType.includes(file.type)) {
        this.$message.warning('图片格式不正确，请重新上传')
        return false
      }
    },
    // 覆盖图片的默认上传行为
    upload(data) {
      console.log(data)
      cos.putObject({
        // 储存桶名称
        Bucket: '77145-1305899718',
        // 地区代码
        Region: 'ap-guangzhou',
        // 上传后的文件名
        Key: data.file.name + data.file.size,
        // 写死的标准类型
        StorageClass: 'STANDARD',
        // 文件对象本身
        Body: data.file,
        // 进度发生变化时的钩子
        onProgress: (progressData) => {
          // console.log(JSON.stringify(progressData))
          // 环形进度条的添加
          data.file.percent = progressData.percent * 100
          data.onProgress(data.file)
        }
      }, (err, data) => {
        console.log(err || data)
        // 上传完毕的数据处理
        if (!err) {
          this.fileList[0].url = 'http://' + data.Location
          this.fileList[0].status = 'success'
        }
        // 上传完毕隐藏
        setTimeout(() => {
          this.showProgress = false
        }, 800)
        this.$message.success('图片上传成功')
      })
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
