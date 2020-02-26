<template>
    <div class="goods-list">
        <!--<router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">-->
            <!--<img src="item.img_url" alt="">-->
            <!--<h1 class="title">{{ item.title }}</h1>-->
            <!--<div class="info">-->
                <!--<p class="price">-->
                    <!--<span class="now">￥{{ item.sell_price }}</span>-->
                    <!--<span class="old">￥{{ item.market_price }}</span>-->
                <!--</p>-->
                <!--<p class="sell">-->
                    <!--<span>热卖中</span>-->
                    <!--<span>剩{{ item.stock_quantity }}件</span>-->
                <!--</p>-->
            <!--</div>-->
        <!--</router-link>-->

        <!--在网页中有两种跳转方式：
        1. 使用 a标签 的形式，叫做标签跳转
        2. 使用 window.location.href 的形式，叫做 编程时跳转-->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="GoDetail(item.id)">
            <img src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        data() { //往自己组件内部，挂载一些私有数据
            return {
                pageindex: 1, //分页的页数
                goodslist: []
            };
        },
        created() {
            this.getGoodsList();
        },
        methods: {
            getGoodsList() {
                this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result => {
                    if(result.body.status === 0) {
                        this.goodslist = this.goodslist.concat(result.body.message);
                    }
                })
            },
            getMore() {
                this.pageindex++;
                this.getGoodsList();
            },
            GoDetail(id) {
                //使用js的形式进行路由导航
                // 注意：一定要区分 this.$route 和 this.$router
                // 其中，this.$route 是路由参数对象，所有路由中的参数：params,query都属于它
                // this.$router 是一个路由导航对象，用它可以方便的使用JS代码，实现路由的前进后退，跳转到新的URL地址

                // 1.最简单的
                this.$router.push('/home/goodsinfo/' + id);
                // 2.传递对象
                // this.$router.push({path: '/home/goodsinfo/' + id});
                // 3. 传递命名的路由
                // this.$router.push({name: "goodsinfo", params: { id }})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;  /*水平两端对齐*/

        .goods-item {
            width: 50%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 3px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img {
                width: 100%;
            }
            .title {
                font-size: 14px;
            }
            .info {
                background-color: #eee;
                p {
                    margin: 0;
                    padding: 5px;
                }
                .price {
                    .now {
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old {
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                }
            }
        }
    }
</style>