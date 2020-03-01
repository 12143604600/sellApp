import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //存放所有交互数据
    state:{
        goodList:[]
    },
    //改变,它是改变state的唯一方式
    mutations:{
        addGoodList(state,list){
            state.goodList = list
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