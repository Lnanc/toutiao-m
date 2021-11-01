<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <!-- 左边头像模块 -->
        <div class="left">
          <van-image
            round
            fit="cover"
            class="avatar"
            :src="userInfo.photo"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round class="edit">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="title">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="title">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="title">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="title">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div v-else class="header not-login">
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

    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <div class="user-news">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell
        class="logout-cell"
        title="退出登录"
        is-link
        clickable
        v-if="user"
        @click="onLogout"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo} from "@/api/user"
export default {
  name: "MyPage",
  data(){
    return {
      //用户信息
      userInfo: {}
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    //退出登录方法
    onLogout() {
      this.$dialog.confirm({
        title: "确定要退出登录吗?"
        // message: "",
      })
        .then(() => {
          this.$store.commit('setUser',null)
        })
        .catch(() => {
          console.log('点击了取消');
        });
    },

    //获取用户信息
    async loadUserInfo(){
      try {
        const {data} =  await getUserInfo()
        this.userInfo = data.data
        console.log('获取用户列表成功');
      }catch(err) {
        this.$toast('获取用户信息失败')
      }
    }
  },
  created(){
    if(this.user) {
        this.loadUserInfo()
    }
  }
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
        height: 131px;
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
      .edit {
        color: #666;
      }
    }
  }
  .data-stats {
    height: 130px;
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
.grid-nav {
  .grid-item {
    height: 141px;
    i.iconfont {
      font-size: 45px;
    }
    .icon-shoucang {
      color: #eb5253;
    }
    .icon-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 28px;
    }
  }
}
.user-news {
  margin: 9px 0;
  .logout-cell {
    text-align: center;
    margin-top: 9px;
    color: #d86262;
  }
}
</style>
