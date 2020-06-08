import React from 'react';
import BaseLayout from './container/BaseLayout/index';
//因为暂时没有任何页面 先简单定义一个主页
const Index = ()=>{
    return(
        <div>
            我是主页
        </div>
    )
}
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
        ]
     },
]
//把路由配置暴露出去
export default Routes