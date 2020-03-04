import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //存放所有交互数据
    state: {
        goodList: [],
        total:0
    },
    //改变,它是改变state的唯一方式
    mutations: {
        addGoodList(state, list) {
            state.goodList = list
        },
        //数量加
        addNum(state, obj) {
            for (let item of state.goodList) {
                for (let value of item.foods) {
                    if (value.name == obj.name) {
                        value.num += obj.num
                    }
                }
            }
        }
    },
    getters: {
        setArr(state) {
            var newgoods = [];
            for (let item of state.goodList) {
                for (let value of item.foods) {
                    if (value.num != 0) {
                        newgoods.push(value)
                    }
                }
            }
            //去重
            for (var i = 0; i < newgoods.length; i++) {
                //定义一个变量保存当前的对象
                var item = newgoods[i]
                //再次遍历数组
                //定义一个变量j，j是i的后一位
                for (var j = i + 1; j < newgoods.length; j++) {
                    //判断前一项和后一项的名字是否相等，如果相等goodsObj就删除后一个相同的对象
                    if (item.name == newgoods[j].name) {
                        newgoods.splice(j, 1)
                        j--
                    }
                }
            }
            return newgoods;
        }
    }
})



/* var store = new Vuex.Store({
    //存放所有交互数据
    state:{
        name:"李白",
        obj:{name:'王昭君',age:50}
    },
    //改变,它是改变state的唯一方式
    mutations:{
        //只有mutation里的小函数才可以直接改变state数据
        //每个mutation都会接收一个形参,指向上面的state
        changeName(state,name){
            state.name = name
        }
    }
})

//mutation函数必须手动触发
//参数1:要触发的mutation的名字,参数2:要传入的参数值
store.commit('changeName','啦啦啦')

export default store; */