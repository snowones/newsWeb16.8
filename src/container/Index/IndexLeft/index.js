import React, { useState, useEffect } from 'react';
import {Carousel} from 'antd';
import ImgBlockTypeOne from '../../component/ImgBlockTypeOne/index';
const IndexLeft = props => {
    
    return (
       <div>
           <Carousel autoplay>
                <div><img src="https://zyx-news.oss-cn-hangzhou.aliyuncs.com/news1.jpg"/></div>
                <div><img src="https://zyx-news.oss-cn-hangzhou.aliyuncs.com/news2.jpg"/></div>
                <div><img src="https://zyx-news.oss-cn-hangzhou.aliyuncs.com/news3.jpg"/></div>
                <div><img src="https://zyx-news.oss-cn-hangzhou.aliyuncs.com/news4.jpg"/></div>
            </Carousel>
            <ImgBlockTypeOne  count={10} type='4' width='100%' imageWidth='112px'
             cartTitle='美国大暴动' justifyContent='space-around' componentType='1'/>
        </div>
    )
}
export default IndexLeft;