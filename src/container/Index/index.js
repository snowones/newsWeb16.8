import React, { useState, useEffect } from 'react';
import {Row, Col} from 'antd';
//新闻列表组件
import IndexTab from './IndexTab/index';
//主页左边内容 轮播图和新闻图文列表
import IndexLeft from './IndexLeft/index'
//主页底部新闻列表
import IndexBottom from './IndexBottom/index';
//主页右侧新闻列表
import IndexRight from './IndexRight/index';
import './index.scss';

const Index = props => {
    
    return (
        <div className='index'>
        <Row>
            <Col span={2}/>
            <Col span={21}>
                <Row className='top_news'>
                    <Col span={8}>
                        <div className='top_left top'>
                            <IndexLeft />
                        </div>
                    </Col>

                    <Col span={7}>
                        <div className='top_center top'>
                            <IndexTab />
                        </div>
                    </Col>

                    <Col span={6}>
                        <div className='top_right top'>
                            <IndexRight />
                        </div>
                    </Col>

                </Row>

                <Row>
                    <div className='bottom'>
                        <IndexBottom />     
                    </div>
                </Row>

            </Col>
            <Col span={4}/>
        </Row>
        </div>
    );
}
export default Index;