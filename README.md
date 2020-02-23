#这是一个移动端商城项目练习

##制作首页App组件
1.完成 Header 区域， 使用的是 Mint-UI 中的Header组件
2.制作底部的 TabBar 区域，使用的是 MUI 的TabBar.html
  制作购物车小图标时，先把扩展图表 css 拷贝到项目中，
  再拷贝字体库 ttf 文件到项目中，
  为购物车小图标添加样式mui-icon-extra mui-icon-extra-cart
3.要在中间区域放置一个 router-view 展示路由匹配到的组件

## 改造 tabbar 为router-link
## 设置路由高亮
## 点击 tabBar 中的路由链接，展示对应的路由组件

##制作首页轮播图布局
##加载首页轮播图数据
1.使用 vue-resource 获取数据
2.使用 vue-resource 的this.$http.get 获取数据
3.获取到的数据要保存到 data 上
4.使用 v-for 循环渲染每个 item 项

## 改造 九宫格 区域的样式

## 改造 新闻资讯 路由链接

## 新闻资讯页面制作
1. 绘制页面，使用 MUI 中的 media-list.html
2. 使用vue-resource 获取数据
3. 渲染真实数据

##实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造成 router-link, 同时，在跳转的时候应该提供唯一的ID标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在路由模块中，将新闻详情的 路由地址 和 组件页面对应起来

## 实现 新闻详情 的 页面布局 和数据渲染

## 单独封装一个 comment.vue 评论子组件
1.先创建一个 单独的 comment.vue 组件模板
2.在需要使用 comment 组件的页面中，先手动导入 comment 组件
  'import from ./comment,vue'
3.在父组件中，使用 'commponents' 属性，将刚才导入 comment 组件，注册为自己的 子组件
4.将注册子组件时候的 注册名称， 以 标签形式 在页面中 引用 即可

## 获取所有的评论数据显示到页面中

##实现点击加载更多评论的功能
1.为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2.点击加载更多，让 pageIndex++, 然后重新调用 this.getComments() 方法重新获取最新一页的数据
3.为了防止 新数据 覆盖老数据的情况， 我们在 点击加载更多的时候，每当获取到新数据，应该让老数据调用数组的 concat 方法，拼接上新数组



