<template>
  <view class="home">
    <searchInput />

    <!-- swiper -->
    <swiper
      class="swiper"
      indicator-dots="true"
      circular="true"
      autoplay="true"
    >
      <swiper-item v-for="item in swipers" :key="item.id">
        <navigator :url="item.navigator_url">
          <image :src="item.image_src" mode="widthFix" />
        </navigator>
      </swiper-item>
    </swiper>

    <!-- navigation -->
    <view class="nav">
      <navigator
        :url="item.navigator_url"
        v-for="item in cates"
        :key="item.name"
      >
        <image :src="item.image_src" mode="widthFix" />
      </navigator>
    </view>

    <!-- floor -->
    <view class="floor">
      <view
        v-for="item in goodsList"
        :key="item.floor_title.name"
        class="floor_group"
      >
        <h2 class="floor_title">
          <image :src="item.floor_title.image_src" mode="widthFix" />
        </h2>
        <view class="floor_list">
          <navigator
            v-for="good in item.product_list"
            :url="good.navigator_url"
            :key="good.name"
          >
            <image :src="good.image_src" />
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import searchInput from "../../components/search/searchInput.vue";

export default {
  components: {
    searchInput,
  },

  data() {
    return {
      swipers: [],
      cates: [],
      goodsList: [],
    };
  },

  onLoad() {
    this.getSwipers();
    this.getCates();
    this.getGoodsList();
  },

  methods: {
    //swiper
    async getSwipers() {
      const res = await this.$http.get("/home/swiperdata");
      this.swipers = res.message;
    },
    //cates
    async getCates() {
      const res = await this.$http.get("/home/catitems");
      this.cates = res.message;
    },
    //goods
    async getGoodsList() {
      const res = await this.$http.get("/home/floordata");
      this.goodsList = res.message;
    },
  },
};
</script>

<style lang="scss">
.home {
  //swiper
  .swiper {
    width: 750rpx;
    height: 340rpx;
    image {
      width: 100%;
    }
  }

  //nav
  .nav {
    display: flex;
    navigator {
      padding: 30rpx;
      flex: 1;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }

  //floor
  .floor {
    .floor_group {
      .floor_title {
        padding: 10rpx 0;
        image {
          width: 100%;
        }
      }
    }
  }
}

.floor_list {
  padding: 10rpx;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10rpx;
  grid-template-areas:
    "a b c"
    "a b c"
    "a d e"
    "a d e";
  navigator {
    &:first-child {
      grid-area: a;
      height: 400rpx;
    }
    &:nth-child(2) {
      grid-area: b;
      height: 200rpx;
    }
    &:nth-child(3) {
      grid-area: c;
      height: 200rpx;
    }
    &:nth-child(4) {
      grid-area: d;
      height: 200rpx;
    }
    &:nth-child(5) {
      grid-area: e;
      height: 200rpx;
    }
    image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
