<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 滑动导航 -->
    <van-tabs animated v-model="active" class="channel-tabs">
      <van-tab
        :title="channel.name"
        v-for="channel in userchannel"
        :key="channel.id"
      >
        <!-- 文章详情子组件 -->
        <article-list :channel="channel" />
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isShow = true">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /滑动导航 -->

    <!-- 频道列表 -->
    <!-- 弹出层 -->
    <van-popup
      v-model="isShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <!-- 频道内部组件 -->
      <channel-edit
        :my-channel="userchannel"
        :active="active"
        @jumpChannel="onUpdataActive"
      >
      </channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannel } from "@/api/user";
import ChannelEdit from "@/components/channel-edit";
import ArticleList from "./components/article-list";
import { mapState } from "vuex";
import { setItem, getItem } from "@/utils/storage";
export default {
  name: "HomeIndex",
  components: {
    ArticleList,
    ChannelEdit,
  },
  props: {},
  data() {
    return {
      active: 0,
      userchannel: [],
      isShow: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    this.loadChannel();
  },
  mounted() {},
  methods: {
    //获取用户频道
    async loadChannel() {
      // try {
      //   var { data } = await getUserChannel();
      //   this.userchannel = data.data.channels;
      // } catch (err) {
      //   console.log("获取用户频道失败");
      // }
      var userchannel = [];
      try {
        if (this.user) {
          //用户已登录，加载服务器中的数据
          var { data } = await getUserChannel();
          userchannel = data.data.channels;
        } else {
          //用户没有登录，加载本地存储数据
          var localChannel = getItem("MY_CHANNEL");
          if (localChannel) {
            userchannel = localChannel;
          } else {
            //如果本地存储没有数据， 就加载默认数据
            var { data } = await getUserChannel();
            userchannel = data.data.channels;
          }
        }
        //加载数据
        this.userchannel = userchannel;
      } catch (err) {
        this.$toast("获取用户频道失败");
      }
    },
    onUpdataActive(index, isShow = true) {
      (this.active = index), (this.isShow = isShow);
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  height: 73vh;
  overflow-y: auto;
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .van-tab {
      min-width: 200px;
      font-size: 30px;
      color: #777777;
      border-right: 1px solid #edeff3;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background: #3296fa;
      margin-bottom: 8px;
    }
    .placeholder {
      flex-shrink: 0;
      width: 45px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      background: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.9;
      i.iconfont {
        font-size: 33px;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>