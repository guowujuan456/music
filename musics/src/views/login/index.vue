<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm m-login-width">
            <!-- 账号 -->
            <el-form-item label="用户名" prop="username">
                <el-input type="username" v-model="ruleForm.username"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 登录 -->
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
</el-form>
    </div>
</template>
<script>
export default {
  data() {
      //密码
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',//密码
          checkPass: '',
          username: ''//用户名
        },
        //校正规则
        rules: {
          pass: [
            { required:true, validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { required:true ,trigger: 'blur',message:"用户不能为空" }
          ]
        }
      };
    },
    methods: {
        //登录
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let {username,pass}=this.ruleForm;//解构
              this.$api.user.login({username,password:pass}).then(res=>{
                  if (res.data.code===1) {
                      this.$message({
                          message:"登录成功",
                          type:'success'
                      })
                      //注册成功之后跳到music页面
                      localStorage.setItem('token',res.data.token)
                      this.$router.replace('/music')
                  }else{
                      this.message.error("登录失败" )
                  }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
    
}
</script>
<style scoped>
    .m-login-width{
        width: 50%;
        margin: 200px auto;
    }
</style>