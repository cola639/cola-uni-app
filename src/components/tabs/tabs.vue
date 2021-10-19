<template>
  <view class="goodsList_tabs">
    <view
      :class="[index === currentIndex ? 'active' : '', 'tabs_item']"
      v-for="(item, index) in goods"
      :key="index"
      @click="handleClick(index)"
      >{{ item.value }}</view
    >
  </view>
</template>

<script>
export default {
  data() {
    return { currentIndex: 0 };
  },
  props: ["goods"],
  methods: {
    handleClick(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style lang="scss">
.goodsList_tabs {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 10rpx;
  font-weight: 500;
}
.active {
  border-bottom: 1px solid $theme-color;
  color: $theme-color;
}
</style>
