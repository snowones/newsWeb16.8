import React, { useContext,useState, useEffect } from 'react';
import {Text} from './index';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import Logout from '../../User/Logout/index';
import { AppstoreOutlined } from '@ant-design/icons';
import './index.scss';


//建立导航
const Nav = props =>{
    const {userName} = useContext(Text);
    //定义icon
    const userShow = ()=>{
        
        if(userName){
            //说明已经登录
            return(
                <Menu.Item key="logout">
                    <Logout />
                </Menu.Item> 
            )
        }else{
            //说明没有登录
            return(
                <Menu.Item key="user" icon={<AppstoreOutlined />}>
                    注册/登录
                </Menu.Item>
            )
        }
    };

    return(
        <Menu className='nav' mode="horizontal" selectedKeys={[props.current] }
                style={{background: '#f0f2f5'}}
                onClick={props.menuItemClick}
                >
            <Menu.Item key="index" icon={<AppstoreOutlined />}>
                <Link to='/index'>
                    主页
                </Link>
            </Menu.Item>

            <Menu.Item key="article" icon={<AppstoreOutlined />}>
                <Link to='/article'>
                   文章
                </Link>
            </Menu.Item>

            <Menu.Item key="forum" icon={<AppstoreOutlined />}>
                <Link to='/forum'>
                    论坛
                </Link>
            </Menu.Item>
            <Menu.Item key="share" icon={<AppstoreOutlined />}>
                <Link to='/share'>
                    分享
                </Link>
            </Menu.Item>

            {userShow()}
        </Menu>
    );
};
export default Nav;