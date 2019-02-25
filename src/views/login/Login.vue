<template>
    <div class="login"  v-loading="loading">
        <div></div>
        <div class="submit-form">
                <div class="title">
                    CDP后台管理系统
                </div>
                <div class="login-input">
                    <input placeholder="User name" ref="account" autofocus @keyup.enter="changeFocus" v-model="loginData.account" class="input" id="name" type="text">
                </div>
                <div class="login-input">
                    <input placeholder="Password" ref="password" @keyup.enter="login" v-model="loginData.password" type="password">
                </div>
                <div class="login-radio">
                    <input id="saver" type="checkbox" v-model="saveAccount" style="display:none"> 
                    <label for="saver"></label>
                    <span style="margin-left: 10px;">saver</span>
                </div>
                <div class="submit-btn">
                    <input type="button"  @click="login" id="submit" value="登  录" name="">
                </div>
        </div>
    </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'login',
  data: () =>{
      return {
          loading: false,
          loginData: {
              account: '',
              password: ''
          },
          saveAccount: false
      }
  },
  mounted() {
      let cookie = this.$Cookies.get('accountInfo')
      if(cookie) {
          let account = JSON.parse(cookie)
          this.loginData = account
          this.saveAccount = true
      }
  },
  computed: {
        submitData: function () {
            var post_params = Object.assign({}, this.loginData);
            post_params.password = md5(post_params.password);
            return post_params;
        }
    },
  methods: {
      changeFocus() {
          const { account } = this.loginData;
          if(account) {
               this.$refs.password.focus();
          }
      },
      login() {
            const { account, password } = this.loginData;
            if (account == '') {
                this.$message({
                    message: '请输入用户名',
                    type: 'error'
                });
                this.$refs.account.focus();
                return;
            }
            if (password == '') {
                this.$message({
                    message: '请输入密码',
                    type: 'error'
                });
                this.$refs.password.focus();
                return;
            }

            this.$http.post('/api/login', {name: account, password }, {loading: this})
            .then((res) => {
                
                if(this.saveAccount) {
                    this.$Cookies.set('accountInfo', JSON.stringify(this.loginData), { expires: 7 });
                } else {
                    this.$Cookies.remove('accountInfo');
                }   
                this.$store.commit('login', {token: res.data.token})
                this.$router.push('/');
            })
            .catch((res) => {
                if(res.code == 1) {
                    this.$message.warning('账户或密码错误')
                }
            })  
        }
    }
}
</script>
<style lang="scss">
    .login {
        position: absolute;
        background-image: url('../../assets/images/bg_large.png');
        background-size: cover;
        height:100%;
        width:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .submit-form {
            padding: 30px 65px;
            width:460px;
            height: 330px;
            background: #fff;
            box-shadow: 0px 3px 14px 0 rgba(118, 130, 140, 0.6);
            border-radius: 5px;
            line-height: 26px;
            .title {
                color: #3497ec;
                font-size: 16px;
                font-weight:500;
                margin-bottom: 30px;
            }
            .login-input {
                border-bottom: 1px solid #e8e9ed;
                margin-bottom: 28px;
                input {
                    font-size: 14px;
                    line-height: 26px;
                    width:100%;
                }
            }
            .login-radio {
                color: #999;
                display: flex;
                align-items: center;
                margin-bottom: 25px;
                input + label {
                    cursor: pointer;
                    position: relative;
                    height:16px;
                    width: 16px;
                    border-radius: 50%;
                    background: #999;
                    border: 50%
                }
                input + label:before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 5px;
                    left: 5px;
                    height:6px;
                    width: 6px;
                    border-radius: 50%;
                    background: #fff;
                }
                input:checked + label:before {
                    background: #3497ec;
                }
            }
            .submit-btn {
                input {
                    cursor: pointer;
                    background: #272a31;
                    width: 100%;
                    height:46px;
                    color: #ffffff;
                    border-radius: 4px;
                }
            }
        }

    }
</style>


