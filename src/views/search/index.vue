<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索框 -->

    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :search-text="searchText"></SearchResult>
    <!-- /历史结果 -->

    <!-- 联想记忆 -->
    <SearchSuggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></SearchSuggestion>
    <!-- /联想记忆 -->

    <!-- 搜索历史记录 -->
    <SearchHistory v-else></SearchHistory>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from "./components/search-history";
import SearchSuggestion from "./components/search-suggestion";
import SearchResult from "./components/search-result";
export default {
  name: "SearchIndex",
  data() {
    return {
      searchText: "",
      isResultShow: false,
    };
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  props: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //点击搜索/回车按钮后触发--search
    onSearch(text) {
      this.isResultShow = true;
      this.searchText = text;
    },
    //点击搜索旁边取消后触发---search
    onCancel() {
      console.log("取消");
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
