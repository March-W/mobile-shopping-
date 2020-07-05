<template>
    <div class="shopcar-container">

        <!--商品列表项区域-->
        <div class="goods-list">
             <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
                 <div class="mui-card-content">
                     <div class="mui-card-content-inner">
                         <mt-switch
                                 v-model="$store.getters.getGoodsSelected[item.id]"
                                 @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                         <img :src="item.thumb_path" >
                         <div class="info">
                             <h1>{{ item.title }}</h1>
                             <p>
                                 <span class="price">￥{{ item.sell_price }}</span>
                                 <!--从购物车中获取商品数量：创建一个空对象，循环购物车中所有商品，
                                 将当前循环商品的id: count放入空对象中-->
                                 <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                 <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                             </p>
                         </div>
                     </div>
                 </div>
             </div>
        </div>

        <!--结算区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品<span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span>件，
                            总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>

        <p>{{ $store.getters.getGoodsSelected }}</p>

    </div>
</template>

<script>
    import numbox from '../subcommponents/shopcar_numbox.vue'

    export default {
        data() {
            return {
                goodslist: [] //购物车中所有商品数据
            }
        },
        created() {
            this.getGoodsList();
        },
        methods: {
            getGoodsList() {
                //获取到store中所有商品id，然后拼接出一个用逗号分隔的字符串
                var idArr = [];
                this.$store.state.car.forEach(item => idArr.push(item.id));
                //如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
                if (idArr.length <= 0) {
                    return;
                }
                //获取购物车商品列表
                this.$http.get('api/goods/getshopcarlist/'+ idArr.join(',')).then(result => {
                    if (result.body.status === 0) {
                        this.goodslist = result.body.message;
                    }
                });
            },
            remove(id, index) {
                //点击删除，将商品从store中根据id删除，同时将当前组件中goodslist中根据index删除
                this.goodslist.splice(index, 1);
                this.$store.commit('removeFromCar', id);
            },
            selectedChanged(id, val) {
                //每当点击开关，把最新的开关状态同步到store中
                this.$store.commit('updateGoodsSelected', {id, selected: val})
            }
        },
        components: {
            numbox
        }
    }
</script>

<style lang="scss" scoped>
.shopcar-container {
    background-color: #eee;
    overflow: hidden;
    .goods-list {
        .mui-card-content-inner {
            display: flex;
            align-items: center;
        }
        img {
            width: 60px;
        }
        h1 {
            font-size: 13px;
        }
        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price {
                color: red;
                font-weight: bold;
            }
        }
    }
    .jiesuan {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red {
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>