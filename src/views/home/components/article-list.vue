<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- 文章列表 -->
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />

       
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from "@/components/article-item";
import { getArticles } from "@/api/article";
export default {
  name: "Article-list",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
    };
  },
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      try {
        //请求数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
        });

        //解构数据
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;

        //判断还有没有数据, 没有就结束
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        });

        const { results } = data.data;
        this.list.unshift(...results);
        this.isLoading = false;
        console.log(results);
      } catch (err) {
        console.log("刷新失败");
      }
    },
  },
};
</script>

<style>
</style>