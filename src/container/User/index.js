import React, {useContext, useState, useEffect } from 'react';
//需要把上下文也引入
import {Text} from '../BaseLayout/NewsHeader';
import {Tabs, Modal} from 'antd';
import Login from './Login/index'
//注册登录的模块的父组件 用于弹出注册登录模块
const User = props => { 
    //使用父组件中这个上下文provider的value变量和方法
    const  {setModalVisable} = useContext(Text);
     //调用父组件的关闭弹窗方法
    const handleCancel = ()=>{
        setModalVisable(false);
    }
   
    return (
        <Modal 
            title="用户中心" 
            visible={props.visible} 
            onCancel={handleCancel}
            onOk={handleCancel} 
            footer={null}
        >
            <Tabs type="card">
                <Tabs.TabPane tab='登录' key='1'>
                    <Login />
                </Tabs.TabPane>
                <Tabs.TabPane tab='注册' key='2'>
                    我是注册组件
                </Tabs.TabPane>
            </Tabs>
        </Modal>
    )
}
export default User;