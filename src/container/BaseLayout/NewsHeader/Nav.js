import React, { useState, useEffect } from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
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

            <Menu.Item key="hot" icon={<AppstoreOutlined />}>
                <Link to='/hot'>
                   热点新闻
                </Link>
            </Menu.Item>

            <Menu.Item key="guonei" icon={<AppstoreOutlined />}>
                <Link to='/guonei'>
                    国内新闻
                </Link>
            </Menu.Item>

            <Menu.Item key="guoji" icon={<AppstoreOutlined />}>
                <Link to='/guoji'>
                   国际新闻
                </Link>
            </Menu.Item>
        </Menu>

    );
};
export default Nav;