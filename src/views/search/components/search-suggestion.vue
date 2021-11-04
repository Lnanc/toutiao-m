<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(text, index) in Suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="text"></div>
    </van-cell>
  </div>
</template>

<script>
import { getLenovoSuggestion } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  data() {
    return {
      Suggestions: [], //联想建议数组
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
  watch: {
    searchText: {
      //   handler() {
      //     //父组件每次数据变化调用联想记忆
      //     this.loadLenovoSuggestion();
      //   },
      handler: debounce(function (value) {
        this.loadLenovoSuggestion(value);
      }, 300),
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    //请求联想记忆
    async loadLenovoSuggestion(q) {
      try {
        var { data } = await getLenovoSuggestion(q);
        // 把值赋值过去
        this.Suggestions = data.data.options;
      } catch (err) {
        console.log("联想记忆失败", err);
      }
    },
  },
};
</script>

<style></style>
