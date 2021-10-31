<template>
  <div class="my-container">
    <!-- 未登录 -->
    <div class="header not-login">
      <div class="login-item">
        <img
          class="mobile-img"
          src="~@/assets/mobile.png"
          alt=""
          @click="$router.push('/login')"
        />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 已登录 -->
    <div class="header user-info">
      <div class="base-info">
        <!-- 左边头像模块 -->
        <div class="left">
          <van-image
            round
            fit="cover"
            class="avatar"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <span class="name">黑马头条号</span>
        </div>
        <div class="right">
          <van-button
          size="mini"
          round
          class="edit"
          >编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">10</span>
          <span class="title">头条</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="title">关注</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="title">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="title">获赞</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyPage",
};
</script>

<style lang="less" scoped>
.my-container .header {
  height: 361px;
  background: url("~@/assets/banner.png");
  background-size: cover;
}
.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
}
// 已登录
.user-info {
  .base-info {
    height: 231px;
    background: pink;
    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;

      .avatar {
        width: 131px;
        height: 131px;;
      }
      .name {
        font-size: 30px;
        padding-left: 22px;
        color: #fff;
      }
      
    }
    .right {
      display: flex;
      align-items: center;
      .edit{
        color: #666;
      }
    }
  }
  .data-stats {
    height: 130px;
    background: skyblue;
    display: flex;
    color: #fff;
    .data-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .count {
        font-size: 36px;
      }
      .title {
        font-size: 23px;
      }
    }
  }
}
</style>
