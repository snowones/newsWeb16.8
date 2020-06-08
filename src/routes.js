import React from 'react';
function Index(){
    return(
        <div>
            我是主页
        </div>
    )
}
//配置路由
var Routes = [   

    {
        path: '/',
        component: Index
    },
    {
        path: '/index',
        component: Index
    }
]
export default Routes