<template>
  <div id="shop_cart">
    <div class="add_shopping" v-for="(item,i) in goodslist" :key="i">
      <img :src="item.image" alt="">
      <div class="text_price">
        <p class="shopping_name">{{item.name}}</p>
        <div class="shopping_price">
          <div class="shop_price">￥{{(item.price*item.num).toFixed(2)}}<span v-show="item.oldPrice !=''">￥{{item.oldPrice*item.num}}</span></div>
          <div class="shop_num_btn">
            <button v-show="item.num != 0" @click="subNum(item.name,)">
              <Icon type="md-remove" size="18" /></button>
            <span v-show="item.num != 0">{{item.num}}</span>
            <button @click="addNum(item.name)">
              <Icon type="md-add" size="18" /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods:{
      addNum(name){
          this.$store.commit('addNum',name)
      },
      subNum(name){
          this.$store.commit('SubNum',name)
      },
  },
  created() {},
  computed: {
    //获取去重过后的数组
    goodslist() {
      return this.$store.getters.setArr;
    }
  }
};
</script>

<style lang="less" scoped>
#shop_cart {
  .add_shopping {
    padding: 15px;
    display: flex;
    img {
      width: 50px;
      height: 50px;
    }
    .text_price {
      flex: 1;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .shopping_name {
        font-size: 16px;
      }
      .shopping_price {
        display: flex;
        justify-content: space-between;
        .shop_price {
          font-size: 14px;
          color: red;
          span {
            font-size: 12px;
            margin-left: 10px;
            text-decoration: line-through;
            color: #888;
          }
        }
        .shop_num_btn {
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
            outline-style: none;
          }
          span {
            margin: 0 5px;
          }
        }
      }
    }
  }
}
</style>