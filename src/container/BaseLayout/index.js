import React, { useState, useEffect } from 'react';
import NewsHeader from './NewsHeader/index';
import NewsFooter from './NewsFooter/index';
//引入renderRoutes
import { renderRoutes } from 'react-router-config';
import { Layout } from 'antd';
import './index.scss';

const { Content } = Layout;

const BaseLayout = props => {
    return (
        <Layout className="layout">
            <NewsHeader />
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    {renderRoutes(props.route.children)}
                </div>
            </Content>
            <NewsFooter /> 
        </Layout>
    )
}
export default BaseLayout;