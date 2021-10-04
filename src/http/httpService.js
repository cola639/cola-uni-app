const BASE_URL = "https://api-hmugo-web.itheima.net/api/public/v1";

// async版get请求
async function getAsync(option) {
  uni.showLoading({
    title: "数据加载中...",
    mask: true,
  });

  try {
    const result = await uni.request({
      //传入路由参数
      url: BASE_URL + option,
      method: "GET",
    });

    uni.hideLoading();
    return result[1]["data"];
  } catch (e) {
    uni.hideLoading();

    uni.showToast({
      title: "请求超时！",
      icon: "none",
      mask: true,
      duration: 2000,
    });
  }
}

export default {
  get: function(url) {
    return getAsync(url);
  },
};
