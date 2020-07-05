// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter);

//注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex);

//每次进入网站，调用main.js时先从本地存储中读取购物车的数据放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]');

var store = new Vuex.Store({
    state: { //this.$store.state.***
        car: car //将购物车中商品的数据用一个数组存储起来
                 // 商品对象：{id: 商品id, count:购买数量, price: 单价, selected: 是否选中}
    },
    mutations: { //this.$store.commit('方法名称','按需传递唯一参数')
        addToCar(state, goodsinfo) {
            //点击加入购物车，将商品信息保存到store中的car上
            var flag = false; //假设在购物车中没有找到对应商品

            //如果购物车中之前已经有对应的商品了，那么只更新数量
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true
                }
            });
            //如果购物车中没有对应商品，则直接把商品push到car中
            if (!flag) {
                state.car.push(goodsinfo);
            }

            //当更新car之后，将car数组存储到本地的localStroge中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            //修改购物车中商品的数量值
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
            });
            //当修改完商品的数量，将最新的购物车数据保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFromCar(state, id) {
            //根据id将store中购物车中对应商品删除
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1);
                    return true;
                }
            });
            //将删除后的最新购物车数据同步到本地存储总
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected;
                }
            });
            //将最新的购物车商品的selected状态保存到本地存储中去
            localStorage.setItem('car', JSON.stringify(state.car));
        }
    },
    getters: { //this.$store.getters.***
        //相当于computed，也相当于filters
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count;
            });
            return c
        },
        getGoodsCount(state) {
            var obj = {};
            state.car.forEach(item => {
                obj[item.id] = item.count;
            });
            return obj;
        },
        getGoodsSelected(state) {
            var obj = {};
            state.car.forEach(item => {
                obj[item.id] = item.selected;
            });
            return obj;
        },
        getGoodsCountAndAmount(state) {
            var obj = {
                count: 0, //勾选数量
                amount: 0 //勾选总价
            };
            state.car.forEach(item => {
                if (item.selected) {
                    obj.count += item.count;
                    obj.amount += item.count * item.price;
                }
            })
            return obj;
        }
    }
});

//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern="YYYY-MM-DD HH:mm:ss ") {
    return moment(dataStr).format(pattern)
})


// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource);
//设置全局根路径
Vue.http.options.root = 'http://api.cms.liulongbin.top'; //http://127.0.0.1:8899 http://vue.studyit.io
// 全局设置 post 时候表单数据格式形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// 导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// // 按需导入mint-ui中的组件
// import { Header, Swipe, SwipeItem, Button, Layload } from 'mint-ui'
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Layload);
import MintUI from 'mint-ui'
Vue.use(MintUI);
import 'mint-ui/lib/style.css'

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);

// 1.3 导入自己的 router.js 路由模块
import router from './router.js'

// 导入App根组件
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,  // 挂在路由对象到 VM 实例上
    store //挂载 store 状态管理对象
})