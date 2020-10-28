import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { List, Avatar} from 'antd';
//antd v4升级后 拿不到以前的Icon了 换成了SmileOutlined
import { SmileOutlined } from '@ant-design/icons'
import {api,host} from '../../public/until';
import './index.scss';

//定义icon
const IconText = props => (
    <span>
        <SmileOutlined type={props.type} style={{ marginRight: 8 }} />
        {props.text}
    </span>
);

const Article = props => {
    //需要渲染的数据
    const [dataList,setDataList] = useState([]);
    //组件加载时调用 相当于componsetNewsentDidMount 
    useEffect(()=>{
        //拿到数据
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

  
    //处理数据
    const showData = (data)=>{
        let listData = [];
        for (let i = 0; i < data.length; i++) {
            let img = JSON.parse(data[i].img);
            listData.push({
                id: data[i].id,
                title: data[i].title + '：' +data[i].subtitle,
                avatar: data[i].avatar,
                description: data[i].title + '：' +data[i].subtitle,
                content:data[i].content,
                img,
            });
        }
        //修改数据
        setDataList(listData);
    }

    return (
        <div className='Article'>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={dataList}
                renderItem={item => (
                    <Link to={`details/${item.id}`} target='_blank'>
                        <List.Item
                            key={item.title}
                            actions={[
                            <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                            <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                            <IconText type="message" text="2" key="list-vertical-message" />,
                            ]}
                            extra={ <img width={272} alt="logo" src={item.img[0]}/>}
                        >
                        <List.Item.Meta
                            avatar= {<Avatar src={item.avatar} />}
                            description= {item.description}
                        />
                            {item.content}
                        </List.Item>
                        
                    </Link>
                )}
            />
        </div>
    )
}
export default Article;