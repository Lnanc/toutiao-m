<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getLenovoResult } from "@/api/search";
export default {
  name: "SearchResult",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 13,
    };
  },
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        var { data } = await getLenovoResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText,
        });
        var data = data.data.results;
        //添加到数组
        this.list.push(...data);
        this.loading = false;

        // 如果没有数据了就停止加载
        if (data.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (err) {
        console.log("数据加载错误", err);
      }
      // // 异步更新数据
      // // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 11) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
  },
};
</script>

<style></style>
