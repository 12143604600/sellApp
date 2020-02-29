<template>
  <div id="goods_box">
    <!-- 菜单列表 -->
    <div class="goods_meun">
      <ul class="content">
        <div v-for="(v,i) in data" :key="i" class="meun_btn_box">
          <div :class="{meun_btn:true,active: i==meunBtni}" @click="nameClick(i)">
            {{v.name}}
          </div>
        </div>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="goods_list_box">
      <ul class="content">
        <div :id="i" v-for="(v,i) in data" :key="i">
          <h2>{{v.name}}</h2>
          <div class="goods_list" v-for="(val,index) in v.foods" :key="index">
            <img :src="val.image" alt="">
            <div class="goods_list_text">
              <h3>{{val.name}}</h3>
              <p class="description">{{val.description}}</p>
              <p><span>月销售{{val.sellCount}}份</span>&nbsp;<span>好评率{{val.rating}}%</span></p>
              <p class="price"><span>￥{{val.price}}</span>&nbsp;<span>{{val.oldPrice}}</span>
                <i-button type="primary" size='small' shape="circle">一</i-button>{{val.num}}<i-button shape="circle"
                  type="primary" size='small'>+</i-button>
              </p>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getGoods } from "../api/apis";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      data: [],
      meunBtni: 0
    };
  },
  methods: {
    goods() {
      getGoods().then(res => {
        this.data = res.data.data;
      });
    },
    nameClick(i) {
      this.meunBtni = i;

      this.rightDiv.scrollToElement(document.getElementById(i), 600); //用实例对象.要调用的函数
    }
  },
  created() {
    this.goods();
  },
  mounted() {
    new BScroll(document.querySelector(".goods_meun"), {
      click: true
    });

    this.rightDiv = new BScroll(document.querySelector(".goods_list_box"));
  }
};
</script>

<style lang="less" scoped>
#goods_box {
  flex: 1;
  display: flex;
  height: 100%;
  //商品菜单
  .active {
    background-color: #fff;
  }
  .goods_meun {
    height: 100%;
    text-align: center;
    overflow: scroll;
    width: 80px;
    background-color: #f3f6f6;
    .meun_btn_box {
      height: 50px;
      line-height: 25px;
      font-size: 12px;
      .meun_btn {
        height: 50px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
  //商品列表
  .goods_list_box {
    background-color: #fff;
    overflow: scroll;
    h2 {
      height: 26px;
      line-height: 26px;
      font-size: 12px;
      color: #869f9b;
      background-color: #f3f6f6;
      padding-left: 20px;
      border-left: 2px solid #dadee2;
    }
    .goods_list {
      display: flex;
      padding: 18px;
      border-bottom: 1px solid #ccc;
      img {
        width: 58px;
        height: 58px;
        border: 1px solid #ccc;
      }
      .goods_list_text {
        margin-left: 15px;
        h3 {
          font-size: 14px;
        }
        .description {
          overflow: hidden;
          // white-space: nowrap;
          text-overflow: ellipsis;
        }
        .price {
          // display: flex;
          line-height: 26px;
          justify-content: space-around;
          span:nth-of-type(1) {
            color: red;
            font-size: 14px;
          }
          span:nth-of-type(2) {
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
</style>