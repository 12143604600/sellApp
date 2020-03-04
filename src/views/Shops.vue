<template>
  <div id="shops">
    <div class="shop_title">
      <!-- 头部上 -->
      <div class="shop_title_top">
        <!-- 商家评分、销量 -->
        <div class="shop_title_top_left">
          <h1>{{data.name}}</h1>
          <Rate disabled v-model="data.serviceScore" />
          <span>({{data.ratingCount}})</span>
          <span>月售{{data.sellCount}}单</span>
        </div>
        <!-- 收藏 -->
        <div class="shop_title_top_right">
          <Icon type="ios-heart-outline" />
          <p>收藏</p>
        </div>
      </div>
      <!-- 头部下 -->
      <div class="shop_title_bottom">
        <div class="shop_title_bottom_text">
          <p>起送价</p>
          <p>{{data.minPrice}}元</p>
        </div>
        <div class="shop_title_bottom_text middle">
          <p>商家配送</p>
          <p>{{data.deliveryPrice}}元</p>
        </div>
        <div class="shop_title_bottom_text">
          <p>平均配送时间</p>
          <p>{{data.deliveryTime}}分钟</p>
        </div>
      </div>
    </div>
    <!-- 活动/公告 -->
    <div class="shops_bulletin_activity">
      <div class="shops_bulletin">
        <h2>公告/活动</h2>
        <p>{{data.bulletin}}</p>
      </div>
      <div class="shops_supports" v-for="(item,index) in data.supports" :key="index">
        <img src="../assets/images/decrease_1@2x.png" alt="" v-show="item.type == 0">
        <img src="../assets/images/discount_1@2x.png" alt="" v-show="item.type == 1">
        <img src="../assets/images/special_3@2x.png" alt="" v-show="item.type == 2">
        {{item.description}}
      </div>
    </div>
    <!-- 商家实景 -->
    <div class="shops_scenery">
      <h2>商家实景</h2>
      <div class="shops_scenery_img">
        <img :src="item" alt="" v-for="(item,i) in data.pics" :key="i">
      </div>
    </div>
    <!-- 商家信息 -->
    <div class="shops_msg">
        <div class="shops_msg_noe" v-for="(item,i) in data.infos" :key="i">
            {{item}}
        </div>
    </div>
  </div>
</template>

<script>
import { getSeller } from "../api/apis";
export default {
  data() {
    return {
      data: {},
      valueDisabled: 3
    };
  },
  methods: {
    seller() {
      getSeller().then(res => {
        console.log(res.data.data);
        this.data = res.data.data;
      });
    }
  },
  created() {
    this.seller();
  }
};
</script>

<style lang="less" scoped>
#shops {
  //头部
  padding-bottom: 80px;
  .shop_title {
    height: 160px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ccc;
    //头部上
    .shop_title_top {
      flex: 1;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .shop_title_top_left {
        font-size: 16px;
        span {
          margin-left: 10px;
          font-size: 12px;
        }
      }
      .shop_title_top_right {
        text-align: center;
        margin-right: 20px;
        font-size: 16px;
      }
    }
    //头部下
    .shop_title_bottom {
      flex: 1;
      display: flex;
      justify-content: space-around;
      padding: 10px 0;
      text-align: center;
      .middle {
        border-right: 1px solid #ccc;
        border-left: 1px solid #ccc;
      }
      .shop_title_bottom_text {
        flex: 1;
        p:nth-of-type(1) {
          color: #999;
        }
        p:nth-of-type(2) {
          font-size: 18px;
        }
      }
    }
  }
  //公告活动
  .shops_bulletin_activity {
    border-top: 15px solid #eaeaea;
    padding: 0px 20px 0;
    .shops_bulletin {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      h2 {
        font-size: 16px;
        margin-bottom: 6px;
      }
      p {
        color: red;
        line-height: 20px;
        letter-spacing: 2px;
      }
    }
    .shops_supports {
      padding: 15px 0;
      border-bottom: 1px solid #ccc;
      display: flex;
      align-items: center;
      img {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }
    }
  }
  //商家实景
  .shops_scenery {
    border-top: 15px solid #eaeaea;
    padding: 15px 20px;
    h2 {
      font-size: 16px;
      margin-bottom: 6px;
    }
    .shops_scenery_img {
      display: flex;
      img {
        width: 25%;
        height: 75px;
        margin-right: 5px;
      }
    }
  }
  //商家信息
  .shops_msg{
      border-top: 15px solid #eaeaea;
      padding: 15px 20px;
      .shops_msg_noe{
          padding: 10px 0;
          font-size: 14px;
          border-bottom: 1px solid #eaeaea;
      }
  }
}
</style>