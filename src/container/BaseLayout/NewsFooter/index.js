import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const NewsFooter = props=> {
    return(
        <Footer style={{ textAlign: 'center' }}>
            News Web ©2020 Created by ZYX
        </Footer>
    )
}
export default NewsFooter;