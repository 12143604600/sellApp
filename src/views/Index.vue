<template>
  <div id="center">
    <div class="shops_box" :style="{'backgroundImage': 'url(' + seller.avatar + ')'}">
      <div class="shops_content">
        <img :src="seller.avatar" alt="" style="width:60px; height:62px">
        <div class="shops_content_right">
          <h3><img src="../assets/images/brand@2x.png" alt=""> {{seller.name}}</h3>
          <p>{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
          <p><img src="../assets/images/decrease_1@2x.png" alt="" style="width:24px; height:18px"> {{description}}</p>
        </div>
      </div>
      <div class="notice_box"><img src="../assets/images/bulletin@2x.png" alt=""> {{seller.bulletin}}></div>
    </div>
    <!-- 二级路由导航栏 -->
    <div class="router_nav">
      <router-link to="/goods">商品</router-link>
      <router-link to="/evaluate">评价</router-link>
      <router-link to="/shops">商家</router-link>
    </div>
    <router-view></router-view>

    <!-- 购物车盒子-->
    <transition name="slide-fade">
      <div class="shopping_cart_box" v-show='showCart'>
      </div>
    </transition>
    <!-- 底部购物条 -->
    <div class="shopcart_box" @click="showCart = !showCart">
      <div class="leftBox">
        <ul>
          <li>
            <div >
              <Icon type="md-cart" size="50"/>
            </div>
          </li>
          <li>
            <p>￥&nbsp;&nbsp;&nbsp;20</p>
          </li>
          <li>
            <p>另需配送费4元</p>
          </li>
        </ul>
      </div>
      <div class="rightBox">
        <p>20元起送</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getSeller } from "../api/apis";
export default {
  data() {
    return {
      showCart: false,
      seller: {},
      description: ""
    };
  },
  methods: {
    getseller() {
      //发送请求获取商家数据
      getSeller().then(res => {
        this.seller = res.data.data;
        this.seller.supports.map(v => {
          if (v.type == 0) {
            this.description = v.description;
          }
        });
      });
    }
  },
  created() {
    this.getseller();
  }
};
</script>

<style lang="less" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(100px);
  opacity: 0;
}
//商家头部
#center {
  display: flex;
  flex-direction: column;
  height: 100%;
  //商家
  .shops_box {
    background: repeat;
    height: 130px;
    //商家中间内容
    .shops_content {
      padding: 20px 10px 0px 20px;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      height: 80%;
      // 右边内容
      .shops_content_right {
        margin-left: 20px;
        h3 {
          color: #fff;
          font-size: 16px;
          height: 20px;
          line-height: 20px;
          img {
            vertical-align: middle;
            width: 24px;
            height: 18px;
          }
        }
        p {
          color: #fff;
          font-size: 14px;
          line-height: 22px;
          img {
            vertical-align: middle;
            width: 22px;
            height: 14px;
          }
        }
      }
    }
    //公告
    .notice_box {
      height: 20%;
      padding: 0 15px;
      background-color: rgba(0, 0, 0, 0.6);
      color: #fff;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 26px;
      img {
        height: 50%;
        vertical-align: middle;
      }
    }
  }
  //导航栏
  .router_nav {
    display: flex;
    justify-content: space-around;
    height: 40px;
    text-align: center;
    font-size: 18px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }

  .shopping_cart_box {
    width: 100%;
    height: 150px;
    background-color: orange;
    position: fixed;
    bottom: 80px;
  }
  //购物车
  .shopcart_box {
    width: 100%;
    height: 80px;
    position: fixed;
    bottom: 0;
    display: flex;
    .leftBox {
      width: 74%;
      background: #121e25;
      ul {
        display: flex;
        padding: 10px;
        li {
          width: 24%;
          height: 80px;
        }
        li:nth-of-type(1) {
          width: 80px;
          background: #121e25;
          border-radius: 50%;
          position: relative;
          top: -28px;
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            width: 60px;
            height: 60px;
            text-align: center;
            line-height: 85px;
            border-radius: 50%;
            background: #2a343c;
            color: #ccc;
          }
        }
        li:nth-of-type(2) {
          width: 25%;
          border-right: 1px #2b353f solid;
          text-align: center;
          height: 50px;
          line-height: 50px;
          font-size: 14px;
          font-weight: bold;
          color: #929295;
        }
        li:nth-of-type(3) {
          width: 50%;
          font-size: 16px;
          color: #929295;
          height: 50px;
          line-height: 50px;
          text-align: center;
        }
      }
    }
    .rightBox {
      width: 26%;
      background: #25353a;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      line-height: 80px;
    }
  }
}
</style>