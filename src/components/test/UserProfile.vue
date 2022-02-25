<template>
  <div class="hello">
    <el-form :model="user" label-position="left" label-width="80px">
      <el-form-item label="ID">
        <el-input v-model="user.id" autocomplete="off" placeholder="输入ID" disabled></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload v-if="!user.avatar"
                class="avatar-uploader"
                action="api/file/uploadFile"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div v-else>
          <img :src="user.avatar" class="avatar">
          <el-upload
                     class="avatar-uploader"
                     action="api/file/uploadFile"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="user.realname" autocomplete="off" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="user.telephone" autocomplete="off" placeholder="输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email" autocomplete="off" placeholder="输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="user.major" placeholder="班级" clearable>
          <el-option v-for="item in majors"
                     :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()">提 交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data() {
      return {
        user: this.$store.state.user,
        majors: ['','计科一班','计科二班','软件一班','软件二班','电商一班','电商二班'],
        imageUrl: ''
      }
    },
    methods: {
      submit() {
        this.$store.dispatch('user/modify', this.user)
          .then(() => {
            this.$message({message: "修改信息成功", type: "success"})
          })
          .catch(() => {
          })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        //console.log('res',res)
        this.user.avatar = res.fileDownloadUri
      },
      beforeAvatarUpload(file) {
        const isIMG = /.(jpg|jpeg|png|JPG|PNG)$/.test(file.name);
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isIMG) {
          this.$message.error('上传头像图片只能是图片格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isIMG && isLt2M;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    width: 500px;
    border: 1px solid #eee;
    /*left: 50%;*/
    padding: 32px;
    /*background-color: rgba(66, 185, 120, 0.44);*/
    position: relative;
    /*margin-top: 250px;*/
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
