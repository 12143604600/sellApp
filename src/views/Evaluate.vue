<template>
  <!-- 评价 -->
  <div id="evaluate_box">
    <!-- 综合评价 -->
    <div class="comp_asses">
      <div class="comp_asses_left">
        <p>{{data.serviceScore}}</p>
        <p>综合评价</p>
        <p>高于周边商家{{data.rankRate}}%</p>
      </div>
      <div class="comp_asses_right">
        <div class="comp_asses_right_text">
          <span class="asses_left_text">服务态度</span>
          <Rate disabled show-text :value.sync="data.serviceScore">
            <span style="color: #f5a623">{{ data.serviceScore }}</span>
          </Rate>
        </div>
        <div class="comp_asses_right_text">
          <span class="asses_left_text">口味平分</span>
          <Rate disabled show-text :value.sync="data.score">
            <span style="color: #f5a623">{{ data.score }}</span>
          </Rate>
        </div>
        <div class="comp_asses_right_text">
          <span class="asses_left_text">送达时间</span>
          <span>{{data.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>

    <!-- 评论 -->
    <div class="evaluate_list">
      <div class="infor_filter">
        <button @click="typebtn(2)">全部(24)</button>
        <button @click="typebtn(0)">满意(18)</button>
        <button @click="typebtn(1)">不满意(6)</button>
      </div>
      <div class="screen">
        只看有内容的评论
      </div>
    </div>

    <!-- 评论列表 -->
    <div class="comment_list">
      <!-- 用户评论 -->
      <div class="user_comment" v-for="(item,i) in list" :key="i">
        <!-- 头像 -->
        <img class="head_img" :src="item.avatar" alt="">
        <!-- 昵称、评价、内容 -->
        <div class="name_text">
          <p class="username_date"><span>{{item.username}}</span><span>{{item.rateTime|formatDate}}</span></p>
          <div>
            <Rate disabled :value.sync="item.score"></Rate>{{item.deliveryTime}}分钟送达<span></span>
          </div>
          <p>{{item.text}}</p>
          <p class="thumbs_p">
            <Icon type="md-thumbs-up" v-show="item.rateType==0" />
            <Icon type="md-thumbs-down" v-show="item.rateType==1" />
            <span v-for="(val,index) in item.recommend" :key="index">{{val}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSeller } from "../api/apis";
import { getEvaluate } from "../api/apis";
//时间戳
import moment from "moment";

export default {
  data() {
    return {
      data: {},
      list: [],
      type: 2
    };
  },
  methods: {
    //商家数据
    seller() {
      getSeller().then(res => {
        this.data = res.data.data;
      });
    },
    //评论数据
    evaluate() {
      getEvaluate().then(res => {
        this.list = res.data.data;
      });
    },
    //显示全部、满意、不满意点击事件，
    typebtn(value) {
      this.type = value
      console.log(this.list)
    }
  },
  mounted() {
    this.seller();
    this.evaluate();
  },
  filters: {
    formatDate: value => {
      return moment(value).format("YYYY-MM-DD");
    }
  }
};
</script>

<style lang="less" scoped>
#evaluate_box {
  //综合评价
  .comp_asses {
    padding: 10px 0px;
    height: 100px;
    display: flex;
    .comp_asses_left {
      border-right: 1px solid #ccc;
      width: 36%;
      text-align: center;
      p:nth-of-type(1) {
        color: #ffb000;
        font-size: 20px;
      }
      p:nth-of-type(2) {
        color: #000;
        font-size: 16px;
      }
      p:nth-of-type(3) {
        color: #ccc;
      }
    }
    .comp_asses_right {
      // width: 64%;
      flex: 1;
      .comp_asses_right_text {
        display: flex;
        height: 23px;
        line-height: 23px;
        .ivu-rate {
          font-size: 14px;
        }
        .asses_left_text {
          color: #000;
          font-size: 14px;
          margin-right: 10px;
          margin-left: 10px;
        }
      }
    }
  }
  //评论列表
  .evaluate_list {
    border-top: 10px solid #ccc;
    .infor_filter {
      padding: 15px 14px 20px 14px;
      border-bottom: 1px solid #ccc;
      button {
        font-weight: normal;
        font-size: 14px;
        width: 100px;
        height: 30px;
        margin-right: 10px;
        border: 0;
        outline: none;
      }
      button:nth-of-type(1) {
        background-color: rgb(20, 119, 231);
        color: #fff;
      }
      button:nth-of-type(2) {
        background-color: rgb(161, 195, 235);
      }
      button:nth-of-type(3) {
        background-color: rgb(182, 186, 190);
      }
    }
  }
  //筛选只有评论的内容
  .screen {
    padding: 5px 50px;
    font-size: 14px;
    border-bottom: 2px solid #ccc;
  }

  // 用户评论列表
  .comment_list {
    display: flex;
    flex-direction: column;
    padding: 15px;
    .user_comment {
      display: flex;
      flex: 1;
      margin-bottom: 40px;
      //头像
      .head_img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      //内容
      .name_text {
        flex: 1;
        margin-left: 15px;
        .username_date {
          display: flex;
          justify-content: space-between;
        }
        .thumbs_p {
          margin-top: 10px;
          span {
            border: 1px solid #ccc;
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>