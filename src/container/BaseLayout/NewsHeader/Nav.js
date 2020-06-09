import React, { useState, useEffect } from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import { AppstoreOutlined } from '@ant-design/icons';
import './index.scss';

//建立导航
const Nav = props =>{
    return(
        <Menu mode="horizontal" selectedKeys={[props.current] }
                style={{background: '#f0f2f5'}}
                onClick={props.menuItemClick}
                >
            <Menu.Item key="index" icon={<AppstoreOutlined />}>
                <Link to='/index'>
                    主页
                </Link>
            </Menu.Item>

            <Menu.Item key="artcle" icon={<AppstoreOutlined />}>
                <Link to='/artcle'>
                   文章
                </Link>
            </Menu.Item>

            <Menu.Item key="posting" icon={<AppstoreOutlined />}>
                <Link to='/posting'>
                    帖子
                </Link>
            </Menu.Item>

            <Menu.Item key="login" icon={<AppstoreOutlined />}>
                <Link to='/login'>
                   登录
                </Link>
            </Menu.Item>
        </Menu>

    );
};
export default Nav;