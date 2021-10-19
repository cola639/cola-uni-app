<template>
  <view class="cates">
    <searchInput />
    <view class="cates_container">
      <scroll-view class="cates_left" scroll-y="true" :scroll-top="scrollTop">
        <view
          :class="[index === currentIndex ? 'active' : '', 'menu_item']"
          v-for="(item, index) in leftMenuList"
          :key="index"
          @click="handleClick(index)"
          >{{ item }}</view
        >
      </scroll-view>
      <scroll-view class="cates_right" scroll-y="true" :scroll-top="scrollTop">
        <view
          v-for="(item, index) in rightGoodsList"
          :key="index"
          class="goodsList_group"
        >
          <view class="title">{{ item.cat_name }}</view>
          <view class="list">
            <navigator
              v-for="good in item.children"
              :key="good.cat_id"
              :url="`/pages/goodsList/goodsList?cid=${good.cat_id}`"
            >
              <image :src="good.cat_icon" mode="widthFix" />
              <view>{{ good.cat_name }}</view>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import searchInput from "../../components/search/searchInput.vue";
export default {
  data() {
    return {
      cates: [],
      leftMenuList: [],
      rightGoodsList: [],
      currentIndex: 0,
      scrollTop: -1,
    };
  },

  onLoad() {
    this.cates = uni.getStorageSync(`cates`);

    if (!this.cates) return this.getCates();
    if (Date.now() - this.cates.time > 60000 * 3) this.getCates();

    this.leftMenuList = this.cates.data.map((v) => v.cat_name);
    this.rightGoodsList = this.cates["data"][0]["children"];
  },

  methods: {
    async getCates() {
      const res = await this.$http.get("/categories");
      let cates = res.message;

      uni.setStorage({
        key: "cates",
        data: { time: Date.now(), data: cates },
      });

      this.leftMenuList = cates.map((v) => v.cat_name);
      this.rightGoodsList = cates[0]["children"];
    },

    handleClick(index) {
      this.scrollTop = this.scrollTop ? 0 : -1;
      this.currentIndex = index;
      this.rightGoodsList = this.cates["data"][index]["children"];
    },
  },

  components: {
    searchInput,
  },
};
</script>

<style lang="scss">
.cates {
  height: 100%;
  .cates_container {
    height: calc(100vh - 90rpx);
    display: flex;
    .cates_left {
      flex: 2;
      .menu_item {
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30rpx;
      }
      .active {
        color: $theme-color;
        border-left: 6rpx solid $theme-color;
      }
    }
    .cates_right {
      flex: 5;
      .title {
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .list {
        display: flex;
        flex-wrap: wrap;
        navigator {
          flex-basis: 33.3%;
          text-align: center;
          image {
            width: 60%;
          }
        }
      }
    }
  }
}
</style>
