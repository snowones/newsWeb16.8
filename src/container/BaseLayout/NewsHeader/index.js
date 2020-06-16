import React, { useState, useEffect ,createContext } from 'react';
import { Row ,Col } from 'antd';
//引入导航
import Nav from './Nav';
//引入注册和登录模块的弹窗组件
import User from '../../User/index';
import './index.scss';

//创建一个上下文并且这个上下文还需要导出
//使用useContextHook 因为我们的注册登录组件是header组件的孙子组件 
//如果想调用header组件定义的方法 需要层层嵌套所以这里使用上下文去传递方法
export const Text = createContext();
const NewsHeader = ()=> {

    //导航切换 current参数
    const [current,setCurrent] = useState('mail');
    //注册登录的弹窗 默认不弹出
    const [modalVisable,setModalVisable] = useState(false);

    //点击切换 修改current
    const handleClick = e => {
        //点击注册登录的位置 直接弹窗 然后把那个链接设为高亮
        if(e.key == 'user'){
            setCurrent('user');
            //弹出弹窗
            setModalVisable(true);
        }
        setCurrent(e.key)
    };

    //点击登录表单中的登录按钮,成功后保存用户信息
    const loginclick = (userLogin) => {
        localStorage.userName = userLogin.userName;
        localStorage.userId = userLogin.userId;
        localStorage.userAvatar = userLogin.userAvatar;
    }

    return(
        <div className='new-header'>
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a className='logo' href='/'>
                            <img src='https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/logo.png' alt='logo'/>
                            <span>新闻</span>
                        </a>
                    </Col>
                    <Col span={18}>
                        <Nav 
                            current = {current}
                            menuItemClick = {handleClick}
                        />
                        
                        {/* 被这个Provider包裹的全部子组件孙子组件都可以使用value传递的上下文参数 */}
                        {/* 传递一个设置弹窗关闭的方法 和一个登录成功保存用户数据的方法 */}
                        <Text.Provider value = {{setModalVisable,loginclick}}> 
                            {/* 登录注册的弹窗 */}
                            <User
                                visible = {modalVisable}
                            />
						</Text.Provider>
                        
                    </Col>
                </Row>
            </header>
        </div>
    )
}

export default NewsHeader;