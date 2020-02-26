<template>
    <div class="goodsinfo-container">

        // 使用钩子函数实现购物车小球半场动画
        <transition
                @before-enter = "beforeEnter"
                @enter = "enter"
                @ater-enter = "afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>


        <!--商品轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <!--商品购买区域-->
        <div class="mui-card">
				<div class="mui-card-header">{{ goodsinfo.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
                        </p>
                        <p>购买数量 <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        </p>
					</div>
				</div>
        </div>

        <!--商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    // 导入轮播图组件
    import swiper from '../subcommponents/swiper.vue'
    // 导入 数字选择框 组件
    import numbox from '../subcommponents/goodsinfo_number.vue'

    export default {
        data() {
            return {
                id: this.$route.params.id,    //将路由参数对象中的id挂载到data上，方便后期调用
                lunbotu: [], //轮播图的数据
                goodsinfo: {}, //获取商品的详细信息
                ballFlag: false, //控制小球隐藏和显示的标识符
                selectedCount: 1 //保存用户选中的商品数量，默认为1
            }
        },
        created() {
            this.getLunbotu();
            this.getGoodsinfo();
        },
        methods: {
            getLunbotu() {
                this.$http.get('api/getthumimages/' + this.id).then(result => {
                    if(result.body.status === 0) {
                        // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为轮播图组件中，只认识item.img，不认识item.src
                        result.body.message.forEach(item=>{
                            item.img = item.src;
                        });
                        this.lunbotu = result.body.message;
                    }
                })
            },

            getGoodsinfo(){
                this.$http.get('api/goods/getinfo/' + this.id).then(result => {
                    if(result.body.status === 0) {
                         this.goodsinfo = result.body.message[0];
                    }
                })
            },

            goDesc(id) {
                // 点击使用编程式导航跳转到 图文介绍页面
                this.$router.push({name: "goodsdesc", params: { id }})
            },

            goComment(id) {
                // 点击使用编程式导航跳转到 评论页面
                this.$router.push({name: "goodscomment", params: { id }})
            },

            addToShopCar() {
                this.ballFlag = !this.ballFlag;
            },

            beforeEnter(el) {
                el.style.transform = "translate(0,0)";
            },
            enter(el, done){
                el.offseWidth;

                // 获取小球在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                //通过操作DOM获取徽标在页面中的位置
                const badgePosition = document.getElementById("badge").getBoundingClientRect();

                // 获取两者差值
                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;

                // 使用ES6的模板字符串拼接字符
                el.style.transform = `translate(${xDist}px, ${yDist}px)`;
                el.style.transaction = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
                done();
            },
            afterEnter(el){
                this.ballFlag = !this.ballFlag;
            },

            getSelectedCount(count) {
                // 当自组件把选中的数量传送给父组件的时候，把选中的值保存在data上
                this.selectedCount = count;
                // this.$emit("getcount", parseInt(this.$refs.numbox.value));
            }
        },
        components: {
            swiper,
            numbox
        }
    }
</script>

<style lang="scss" scoped>
    .goodsinfo-container {
        background-color: #eee;
        overflow: hidden;

        .now_price {
            color: red;
            font-size: 16px;
            font-weight: bold;
        }

        .mui-card-footer {
            display: block;
            button {
                margin: 10px 0;
            }
        }
        .ball {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top: 390px;
            left: 146px;

        }
    }
</style>