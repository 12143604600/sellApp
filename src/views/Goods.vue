<template>
  <div id="goods_box">
    <!-- 菜单列表 -->
    <div class="goods_meun">
      <ul class="content">
        <div v-for="(v,i) in addGoodList" :key="i" class="meun_btn_box">
          <div :class="{meun_btn:true,active: i==meunBtni}" @click="nameClick(i)">
            {{v.name}}
          </div>
        </div>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="goods_list_box">
      <ul class="content">
        <div :id="i" v-for="(v,i) in addGoodList" :key="i">
          <h2>{{v.name}}</h2>
          <div class="goods_list" v-for="(val,index) in v.foods" :key="index">
            <img :src="val.image" alt="">
            <div class="goods_list_text">
              <h3>{{val.name}}</h3>
              <p class="description">{{val.description}}</p>
              <p><span>月销售{{val.sellCount}}份</span>&nbsp;<span>好评率{{val.rating}}%</span></p>
              <div class="price">
                <div class="price_num"><span>￥{{val.price}}</span><span v-show="val.oldPrice">{{val.oldPrice}}</span>
                </div>
                <div class="numBtn">
                  <button>
                    <Icon type="md-remove" size="18" /></button>
                  {{val.num}}
                  <button>
                    <Icon type="md-add" size="18" /></button>
                </div>
              </div>
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
      meunBtni: 0
    };
  },
  methods: {
    /* async goods() {
      let data = await getGoods().then(res => res.data.data);
      this.data = data;
    }, */
    goods() {
      getGoods().then(res => {
        this.$store.commit("addGoodList", res.data.data);
      });
    },
    nameClick(i) {
      this.meunBtni = i;
      this.rightDiv.scrollToElement(document.getElementById(i), 600); //用实例对象.要调用的函数
    }
  },
  computed: {
    getDivheight() {
      var arr = [];
      var total = 0;
      for (let i = 0; i < this.addGoodList.length; i++) {
        //获取div的高度
        var eachDiv = document.getElementById(i).offsetHeight;
        //把获取到的高度通过计算得到max值,
        arr.push({ min: total, max: total + eachDiv, index: i });
        //累加获取min
        total += eachDiv;
      }
      // 反数组出去
      return arr;
    },
    addGoodList() {
      return this.$store.state.goodList;
    }
  },
  created() {
    this.goods();
  },
  mounted() {
    new BScroll(document.querySelector(".goods_meun"), {
      click: true
    });
    this.rightDiv = new BScroll(document.querySelector(".goods_list_box"), {
      probeType: 3 //开启滚动条监听事件
    });
    this.rightDiv.on("scroll", obj => {
      //监听滚动条高度事件
      let _y = Math.abs(obj.y);
      for (let objheight of this.getDivheight) {
        if (_y >= objheight.min && _y < objheight.max) {
          this.meunBtni = objheight.index;
        }
      }
    });
  }
};
</script>

<style lang="less" scoped>
#goods_box {
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
      font-size: 12px;
      .meun_btn {
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 50px;
        padding: 10px 10px 0;
        border-bottom: 1px solid #ccc;
      }
    }
  }
  //商品列表
  .goods_list_box {
    flex: 1;
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
        flex: 1;
        h3 {
          font-size: 14px;
        }
        .description {
          overflow: hidden;
          // white-space: nowrap;
          text-overflow: ellipsis;
        }
        .price {
          display: flex;
          line-height: 26px;
          justify-content: space-between;
          .price_num {
            span:nth-of-type(1) {
              color: red;
              font-size: 14px;
              margin-right: 10px;
            }
            span:nth-of-type(2) {
              text-decoration: line-through;
            }
          }
          .numBtn {
            font-size: 16px;
            button {
              color: #fff;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              text-align: center;
              line-height: 17px;
              border: 0;
              background-color: rgb(51, 144, 219);
            }
          }
        }
      }
    }
  }
}
</style>