<template>
    <div>
        <!--将来谁使用 轮播图组件，谁为我们传递 lunbotulist-->
        <!--此时，lunbotulist 应该是 父组件向子组件传值来设置-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :v-key="item.url">
                <img :src="item.img" alt="" :class="{full: isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props: ["lunbotuList","isfull"]
    }
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;
        .mint-swipe-item {
            text-align: center;
            img {
                /*width: 100%;*/
                height: 100%;
            }
        }
    }
    .full {
        width: 100%;
    }
</style>