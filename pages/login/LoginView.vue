<script>
import { SET_TOKEN, LOGOUT, SET_LAST_TEST_MESSAGE } from "@/common/index/config/Event.js"
import { canLoginUser, login, logout,getLastTestMessage } from "@/api/index/api.js"
import { showToast,choice } from "../common/index/utils/toast.js"
/**
 * 登录页面
 */
export default {
  data() {
    return {
      username: "",
      phone: "",
      phoneVersion: 0,
      names: null
    }
  },
  created() {
    if (this.$store.state.token) {
      logout()
      this.$store.commit(LOGOUT)
    }
  },

  methods: {
    verification() {
      if (!(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.phone))) {
        showToast("", "手机格式错误")
        return false
      }
      if (this.username.trim() == "") {
        showToast("", "学生姓名为空")
        return false
      }
      if (this.username.trim().lenth > 200) {
        showToast("", "学生姓名长度过大")
        return false
      }

      return true
    },
    login() {
      if (!this.verification()) {
        return
      }
      login(this.phone, this.username.trim()).then(res => {
        if (res.statusCode == 200) {
          this.$store.commit(SET_TOKEN, res.data.data.access_token)
          getLastTestMessage()
            .then(result => {
              if (result.statusCode == 200) {
                this.$store.commit(SET_LAST_TEST_MESSAGE, result.data.data)
                uni.redirectTo({ url: '/pages/main/main' })
              } else {
                showToast("获取信息失败", result.data.message)
              }
            })
        } else if (res.statusCode == 500) {
          showToast("登录失败", res.data.message)
        }
      })
    },
    setName(name) {
      this.username = name
    }
  },
  watch: {
    phone(newValue) {
      const verson = ++this.phoneVersion
      if ((/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(newValue))) {
        canLoginUser(this.phone)
          .then(res => {
            if (res.data.code == 200 && verson == this.phoneVersion) {
              this.names = res.data.data.map(item => item.name)
              if (this.names.length == 1) {
                // this.username = this.names[0]
              }
            }
          })
      }
    }
  }
}
</script>

<template>
  <view>
    <view class="login-title">视力检测信息录入检测</view>
    <view class="login-box">
      <view class="login-input">
        <label for="phone">手机号码</label>
        <input v-model="phone" name="phone" type="tel" />
      </view>
      <view class="pop"></view>
      <view class="login-input">
        <label for="username">学生姓名</label>
        <input v-model="username" name="username" type="text" />
        <view v-show="names && names.length > 0 && username == ''" class="tips">
          <view class="tips-item" v-for="(item, index) in names" @click="setName(item)" :key="index">
            {{ item }}
          </view>
        </view>
      </view>
      <view class="pop"></view>
      <button @click="login" class="login-box-button">登录检测</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login-title {
  padding-top: 350px;
  line-height: 70px;
  color: rgba(16, 16, 16, 1);
  font-size: 48px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
}

.scan {
  position: absolute;
  right: 24px;
  top: 29px;
  max-width: 25vw;
  max-height: 25vw;
  width: 209px;
  height: 209px;
  background-color: rgba(16, 16, 16, 1);
}

.scan-span {
  display: block;
  bottom: -100%;
  width: 100%;
  height: 52px;
  color: rgba(16, 16, 16, 1);
  font-size: 36px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
}

.login-box {
  width: 65vw;
  height: 40vw;
  /* border: 2px dashed #999; */
  margin: 0 auto;
  margin-top: 125px;
}

.login-input {
  position: relative;
  height: 7vw;

  label {
    display: block;
    padding: 1vw;
    width: 15.2vw;
    height: 7vw;
    color: rgba(16, 16, 16, 1);
    font-size: 2.8vw;
    text-align: left;
    float: left;
    font-family: SourceHanSansSC-regular;
  }

  input {
    display: block;
    float: left;
    font-size: 4vw;
    margin-left: 4vw;
    width: 40vw;
    height: 7vw;
    line-height: 2vw;
    padding-left: 1vw;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(187, 187, 187, 1);
  }

  .tips {
    width: 22vw;
    height: 21vw;
    position: absolute;
    left: 30%;
    top: 110%;
    z-index: 3;
    font-size: 4vw;
    overflow: auto;
    border: 1px dashed #999;

    .tips-item {
      height: 5vw;
      border: 1px solid rgba(187, 187, 187, 1);
      background: #cecdcd46;
      font-size: 3vw;
      border-radius: 1vw;
      margin: 1vw 2vw;
      padding-left: 2vw;
      overflow: hidden;
      cursor: pointer;
    }
  }
}

.login-box-button {
  margin: 10px;
  width: 629px;
  margin-top: 80px;
  height: 70px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 1);
  color: rgba(16, 16, 16, 1);
  font-size: 28px;
  margin-top: 200px;
  text-align: center;
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 1);
}

.pop {
  height: 97px;
  clear: both;
}

@media (min-width: 300px) and (min-height: 550px) and (max-width: 700px) and (max-height: 1500px) {

  body,
  #app {
    width: 100vw;
    height: 100vh;
  }

  .scan-span {
    font-size: 20px;
  }

  .login-title {
    font-size: 7vw;
    padding-top: 45%;
  }

  .login-box {
    width: 70%;
    height: 30vh;
    /* border: 2px dashed #999; */
    margin: 0 auto;
    margin-top: 10%;
  }

  .login-input label {
    padding: 5px;
    height: 40px;
    color: rgba(16, 16, 16, 1);
    font-size: 5vw;
    text-align: left;
    width: auto;
    font-family: SourceHanSansSC-regular;
  }

  .login-input input {
    font-size: 15px;
    margin-left: 10px;
    margin-top: 5px;
    width: 40vw;
    height: 5vh;
    line-height: 20px;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(187, 187, 187, 1);
  }

  .pop {
    height: 5vh;
  }

  .login-box-button {
    margin: 0 auto;
    width: 75vw;
    margin-top: 50px;
    height: 50px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 1);
    color: rgba(16, 16, 16, 1);
    font-size: 20px;
    text-align: center;
    font-family: Microsoft Yahei;
    border: 1px solid rgba(187, 187, 187, 1);
  }
}
</style>
