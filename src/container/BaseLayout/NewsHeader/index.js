import React, { useState, useEffect } from 'react';
import { Row ,Col } from 'antd';
//引入导航
import Nav from './Nav';
import './index.scss';


const NewsHeader = ()=> {

    //导航切换 current参数
    const [current,setCurrent] = useState('mail');

    //点击切换 修改current
    const handleClick = e => {
        setCurrent(e.key)
    };

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
                            current={current}
                            menuItemClick={handleClick}/>
                    </Col>
                </Row>
            </header>
        </div>
    )
}

export default NewsHeader;