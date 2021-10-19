<template>
  <view class="goodsList">
    <searchInput />
    <tabs :goods="tabsValue" />
    <view class="goodsList_container">
      <view class="goodsList_item">
        <image src="" mode="" />
        <view class="good_description">
          <view class="good_title"></view>
          <view class="good_price"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import searchInput from "../../components/search/searchInput.vue";
import tabs from "../../components/tabs/tabs.vue";

export default {
  components: { searchInput, tabs },
  data() {
    return {
      tabsValue: [
        {
          id: 0,
          value: "综合",
          isActive: true,
        },
        {
          id: 1,
          value: "销量",
          isActive: false,
        },
        {
          id: 2,
          value: "价格",
          isActive: false,
        },
      ],
    };
  },
  onLoad(option) {
    uni.setNavigationBarTitle({
      title: "商品详情",
    });
  },

  methods: {
    //detail
    async getDetail() {
      const res = await this.$http.get("/goods/detail");
    },
  },
};
</script>

<style lang="scss"></style>
