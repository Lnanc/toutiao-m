<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div class="title" slot="title">我的频道</div>
      <van-button @click="edit = !edit" size="mini" round type="danger" plain>{{
        edit ? "完成" : "编辑"
      }}</van-button>
    </van-cell>
    <!-- 宫格 -->
    <van-grid :gutter="10" :border="false" class="my-grid">
      <van-grid-item
        v-for="(item, index) in myChannel"
        :key="item.id"
        @click="controlCha(item, index)"
      >
        <van-icon
          slot="icon"
          v-show="edit && !fiexChannels.includes(item.id)"
          name="close"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index == active }">
          {{ item.name }}</span
        >
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div class="title" slot="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" :border="false" class="recommend-grid">
      <van-grid-item
        v-for="commend in filterChannel"
        icon="plus"
        :key="commend.id"
        :text="commend.name"
        @click="addCommend(commend)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, setUserChannerls, deleteChannerl } from "@/api/chinne";
import { mapState } from "vuex";
import { setItem, getItem } from "@/utils/storage";
export default {
  name: "ChannelEdit",
  data() {
    return {
      allChannel: [],
      edit: false,
      fiexChannels: [0],
    };
  },
  components: {},
  props: {
    myChannel: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  computed: {
    filterChannel() {
      return this.allChannel.filter((channel) => {
        return !this.myChannel.find((myChannel) => {
          return myChannel.id === channel.id;
        });
      });
    },
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    this.allChannels();
    // this.myChannel = getItem("myChannel");
  },
  mounted() {},
  methods: {
    async allChannels() {
      try {
        var { data } = await getAllChannels();
        this.allChannel = data.data.channels;
      } catch (err) {
        this.$toast("获取频道列表失败");
      }
    },
    async addCommend(commend) {
      this.myChannel.push(commend);
      if (this.user) {
        //用户登录动态存储频道列表到账号
        console.log("用户登录了");
        try {
          await setUserChannerls({
            id: commend.id,
            seq: this.myChannel.length,
          });
          console.log("请求用户数据成功");
        } catch (err) {
          console.log("请求用户数据失败");
          console.log(err);
        }
      } else {
        console.log("用户没有登录");
        // 用户没有登录把频道列表存储在本地储存
        setItem("MY_CHANNEL", this.myChannel);
      }
    },
    controlCha(item, index) {
      if (this.edit) {
        //编辑状态---删除频道
        if (this.fiexChannels.includes(index)) {
          return;
        }
        if (index < this.active) {
          this.$emit("jumpChannel", this.active - 1);
        }
        this.myChannel.splice(index, 1);

        //删除用户频道
        this.delChannel(item);
      } else {
        //完成状态---跳转频道
        this.$emit("jumpChannel", index, false);
      }
    },
    //删除频道
    async delChannel(item) {
      try {
        if (this.user) {
          //用户登录 --调用删除接口
          await deleteChannerl(item.id);
        } else {
          //用户没有登录 -- 删除本地储存
          setItem("MY_CHANNEL", this.myChannel);
        }
      } catch (err) {
        this.$toast("删除频道失败，请稍重试");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.channel-edit {
  margin-top: 85px;
  .title {
    font-size: 32px;
  }
  .van-cell {
    align-items: center;
  }
  .van-cell__value {
    display: flex;
    align-items: center;
    justify-content: right;
    button {
      padding: 0 24px;
      font-size: 28px;
      color: #f85959;
      border-color: #f85959;
    }
  }
  /deep/ .van-grid-item {
    width: 160px;
    height: 86px;
    color: #222222;

    .van-grid-item__content {
      white-space: nowrap;
      background: #f4f5f6;
      .van-grid-item__text,
      .text {
        color: #222222;
        font-size: 28px;
        margin-top: unset;
      }

      //   .van-icon {
      //   }
    }
  }
  /deep/ .recommend-grid {
    .van-grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon {
          font-size: 11px;
          margin-right: 6px;
          color: #222222;
        }
      }
    }
  }
  /deep/ .my-grid {
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-grid-item__icon,
    .van-icon-close {
      font-size: 26px;
      position: absolute;
      top: -10px;
      right: 10px;
      color: #191919;
    }
  }
  .active {
    color: #f85959 !important;
  }
}
</style>
