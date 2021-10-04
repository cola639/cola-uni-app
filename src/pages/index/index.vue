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
            <image :src="good.image_src" mode="widthFix" />
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import searchInput from "../../components/searchInput.vue";

export default {
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

  components: {
    searchInput,
  },
};
</script>

<style lang="less">
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
      .floor_list {
        // 清除浮动
        overflow: hidden;
        navigator {
          float: left;
          width: 32%;

          /* 后四个超链接 */
          &:nth-last-child(-n + 4) {
            /* 原图的宽高 232 *386 */
            // 232 / 386 = 33.33vw / height
            // 第一张图片的高度 height:33.33vw * 386 /  232
            height: 33.33vw * 386 / 232 /2;

            border-left: 10rpx solid #fff;
          }

          /* 2 3 两个超链接 */
          &:nth-child(2),
          &:nth-child(3) {
            border-bottom: 10rpx solid #fff;
          }
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
