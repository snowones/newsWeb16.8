//布局
import BaseLayout from './container/BaseLayout/index';
//主页
import Index from './container/Index/index';
//文章页面
import Article from './container/Article/index';
//帖子页面
import Forum from './container/Forum/index';

//配置路由  通过一个数组
var Routes = [   
    {   
        path: '/',
        component: BaseLayout,
        children: [
            {
                path: '/',
                exact: true,
                component: Index
            },
            {
                path: '/index',
                exact: true,
                component: Index
            },
            {
                path: '/article',
                exact: true,
                component: Article
            },
            {
                path: '/forum',
                exact: true,
                component: Forum
            },
        ]
     },
]
//把路由配置暴露出去
export default Routes