<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
     class="page-nav-bar" 
     title="登录" 
     left-arrow
     @click-left="$router.go(-1)"
      />
      
    <!-- /导航栏 -->

    <!-- 登录表单 -->

    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>

      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 3"
            class="Down-sms-Show"
            format="ss s 后重试"
            @finish="isCountDownShow = false"
          />

          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, getSmsCode } from "@/api/user";
export default {
  name: "login",
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式有误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式有误",
          },
        ],
      },
      isCountDownShow: false,
    };
  },
  methods: {
    async onSubmit() {
      //显示加载
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      try {
        const { data } = await login(this.user);
        this.$toast.success("登录成功");
        this.$router.back()
        //把数值存入store
        this.$store.commit("setUser", data.data);
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或密码错误");
        } else {
          this.$toast.fail("登录失败,请稍后重试");
        }
      }
    },
    //验证手机号
    async onSendSms() {
      try {
        await this.$refs.loginForm.validate("mobile");
      } catch (err) {
        // return console.log("验证失败", err);
      }
      //验证成功显示倒计时
      this.isCountDownShow = true;

      //发送验证码
      try {
        var s = await getSmsCode(this.user.mobile);
        this.$toast("验证码发送成功");
        console.log(s.data);
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast("验证码发送频繁, 请1分钟后再试");
        } else {
          this.$toast("验证码发送失败, 请稍后重试");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .Down-sms-Show {
    text-align: center;
    line-height: 55px !important;
    border-radius: 30px;
    margin-top: 5px;
  }
  .send-sms-btn,
  .Down-sms-Show {
    width: 152px;
    height: 55px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>