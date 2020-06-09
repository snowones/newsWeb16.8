//布局
import BaseLayout from './container/BaseLayout/index';
//主页
import Index from './container/Index/index';
//帖子页面
import Posting from './container/Posting/index';
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
                path: '/posting',
                exact: true,
                component: Posting
            },
        ]
     },
]
//把路由配置暴露出去
export default Routes