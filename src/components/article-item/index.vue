<template>
  <van-cell-group class="aritle-item">
    <van-cell>
      <!-- 标题内容 -->
      <div slot="title" class="title van-multi-ellipsis--l2">
        {{ article.title }}
      </div>
      <!-- 标题下方图片 3张 -->
      <div slot="label">
        <div v-if="article.cover.type === 3" class="cover-wrap">
          <div
            class="cover-item"
            v-for="(imags, index) in article.cover.images"
            :key="index"
          >
            <van-image class="cover-item-img" fit="cover" :src="imags" />
          </div>
        </div>
      </div>
      <!-- 标题下文字 -->
      <div slot="label" class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate }}</span>
      </div>

      <!-- 容器右边图片 1张 -->
      <van-image
        v-if="article.cover.type === 1"
        class="right-cover"
        slot="default"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  name: "AricleItem",
  data() {
    return {};
  },
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.aritle-item {
  //标题
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  //一张图
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    margin-left: 26px;
  }
  .cove-item-img {
    width: 232px;
    height: 146px;
  }
  .cover-wrap {
    display: flex;
    padding: 15px 0 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
    //   margin: 30px 0;
      &:not(:last-child) {
        margin-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
  .label-info-wrap {
      span {
          margin-right: 26px;
          color: #b4b4b4;
          font-size: 23px;
      }
  }
}
</style>
