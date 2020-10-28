import React, { useState, useEffect } from 'react';
import {Card} from 'antd';
import {Link} from 'react-router-dom';

//引入封装的fetch方法和host地址
import {api,host} from '../../../public/until';
import './index.scss';

//外层组件 处理数据
const ImgBlockTypeOne = props => {

     //定义需要渲染使用state
     const [news,setNews] = useState('');

     //组件加载时调用 相当于componentDidMount 
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
                wenzhangType,
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
        for (let i = 0; i < props.count; i++) {
            let img = JSON.parse(data[i].img);
            listData.push({
                uniquekey: data[i].id,
                thumbnail_pic_s: img[0],
                title: data[i].title,
                author_name: data[i].name,
            });
        }

        //调用news的change方法
        setNews(listData)
    }
 
    //根据数据渲染页面
    const newsImage = ()=>{
        if(news.length){
            let newsList = '';
            if(props.componentType == 1){
                newsList=news.map((newsItem, index) => (
                    <div key={index} className='image_news_item' style={{width:props.imageWidth}}>
                        <Link to={`details/${newsItem.uniquekey}`} target='_blank'>
                            <img alt="newsItem.title" src={newsItem.thumbnail_pic_s} width={props.imageWidth}/>
                            <h3>{newsItem.title}</h3>
                            <p>{newsItem.author_name}</p>
                        </Link>
                    </div>
                ));

            }else if (props.componentType == 2){
                newsList=news.map((newsItem,index)=>(
                    <Link to={`details/${newsItem.uniquekey}`} target='_blank' key={index}>
                        <section  className='imageSingle_sec' style={{width:props.width}}>
                            <div className='imageSingle_left' style={{width:props.ImageWidth}}>
                                <img style={{width:props.ImageWidth}} src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
                            </div>
        
                            <div className='imageSingle_right'>
                                <p>{newsItem.title}</p>
                                <span className='realType' >{newsItem.realtype}</span>
                                <span>{newsItem.author_name}</span>
                            </div>
                        </section>
                    </Link>
                ));
            }
             
            return(
                <Card className={props.componentType == '2' ? 'imageSingleCard':'image_card'} title={props.cartTitle} bordered={true} style={{width:props.width,marginTop:'10px'}}>
                    <div className='image_news_container' style={{width:props.width,justifyContent:props.justifyContent}}>
                        {newsList}
                    </div>
                </Card>
            )
        }else{
            return '正在加载'
        }
    }
   
    return (
        <div className='pc_news_imgblock'>
            {newsImage()}
        </div>
    )
}
export default ImgBlockTypeOne;