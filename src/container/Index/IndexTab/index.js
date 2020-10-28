import React, { useState, useEffect } from 'react';
import {Tabs} from 'antd';
import {Link} from 'react-router-dom';
import {host,api} from '../../../public/until';

const { TabPane } = Tabs;

const IndexTab = props => {
    const callback = (key)=>{
        console.log(key);
    }

    //定义渲染需要使用的数据
    const [news,setNews] =useState([]);
     //组件加载时调用 相当于componsetNewsentDidMount 
     useEffect(()=>{
        //动态获取数据 根据传入得type
        let wenzhangType = props.type;
        /**
         * zyx
         * 2020/6/19
         * 拿到数据
         */
        api({
            url:host + 'newsSelectContentByType',
            args: {
                type:1,
            },
            callback: (res) => {
                console.log(res);
                showData(res);
            }
        });    
    },[])

    /**
     * zyx
     * 2020/6/9
     * 数据处理函数
     */
    const showData = (data)=>{
        let listData = [];
        for (let i = 0; i < data.length; i++) {
            let img = JSON.parse(data[i].img);
            listData.push({
                uniquekey: data[i].id,
                title: data[i].title,
            });
        }
        //调用news的change方法
        setNews(listData)
    }

    const List = ()=>{
        console.log(news);
       
        let newsList=news.map((newsItem, index) => (
            <li key={index}>
                 <Link to={`details/${newsItem.uniquekey}`} target='_blank'>
                     {newsItem.title}
                 </Link>
             </li>
        ));
        return(
            <ul>
                {newsList}
            </ul>
        )
    }
    return (
       <div>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="热点文章" key="1">
                    <List />
                </TabPane>
                <TabPane tab="热点帖子" key="2">
                    <List />
                </TabPane>
                <TabPane tab="国际新闻" key="3">
                    <List />
                </TabPane>
                <TabPane tab="国内新闻" key="4">
                    <List />
                </TabPane>
            </Tabs>
        </div>
    )
}
export default IndexTab;