<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div class="title" slot="title">我的频道</div>
      <van-button @click="edit = !edit" size="mini" round type="danger" plain
        >{{edit?"编辑":"完成"}}</van-button
      >
    </van-cell>
    <!-- 宫格 -->
    <van-grid :gutter="10" :border="false" class="my-grid">
      <van-grid-item v-for="(item, index) in myChannel" :key="item.id">
        <van-icon slot="icon" @click="subChanned(item)" v-show="edit" name="close"></van-icon>
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
import { getAllChannels } from "@/api/chinne";
export default {
  name: "ChannelEdit",
  data() {
    return {
      allChannel: [],
      edit: false,
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
  },
  watch: {},
  created() {
    this.allChannels();
  },
  mounted() {},
  methods: {
    async allChannels() {
      try {
        var { data } = await getAllChannels();
        this.allChannel = data.data.channels;
        this.$toast("获取频道列表成功");
      } catch (err) {
        this.$toast("获取频道列表失败");
      }
    },
    addCommend(commend) {
      this.myChannel.push(commend);
    },
    subChanned(item){
        this.allChannel.push(item)
        
    }
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
