import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { List, Avatar,Row,Col,Button,Skeleton} from 'antd';
//antd v4升级后 拿不到以前的Icon了 换成了SmileOutlined
import { SmileOutlined } from '@ant-design/icons'
import {api,host} from '../../public/until';
import './index.scss';
//引入useFetch
// import useFetch from '../../public/useFetch';
import useApi from '../../public/useApi';

//定义icon
const IconText = props => (
    <span>
        <SmileOutlined type={props.type} style={{ marginRight: 8 }} />
        {props.text}
    </span>
);

const Forum = props => {
    const [rawData,setRawData] = useState([]);//请求拿到的数据
    const [listData,setListData] = useState([]);//渲染到页面上的全部数据
    const [param,setParam] = useState({type:2})

    const {result,loading,beginFetch} = useApi(
        host + 'newsSelectContentByType',
        param,
        [],
        true
    );

    //点击加载更多触发
    const onLoadMore = () => {
       //设一个loading动画 先渲染空数据
       setListData(listData.concat([...new Array(3)].map(() => ({ loading: true, name: {} ,img:[,,,]}))))
       //因为这里拿数据很快 所以做一个暂停的动画展示
       setParam({
           type:3
       })
    };

    //拿到返回数据后重新拼接结果
    useEffect(()=>{
        showData(result);
    },result)

    //参数变了的话重新请求
    useEffect(()=>{
        beginFetch();
    },param)

    //组件加载时调用 相当于componsetNewsentDidMount 
    useEffect(()=>{
        //拿到数据
        showData(result);
    },[])

    //处理数据
    const showData = (data)=>{
        console.log('测试data');
        console.log(data);
        if(!data || data.length == 0){
            return;
        }
        let listData = [];
        //这里先只取三个数据
        for (let i = 0; i < 3; i++) {
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
        let tempData = rawData.concat(listData);
        //修改数据
        setRawData(tempData);
        setListData(tempData);
    }


    /**
     * zyx
     * 2020/6/16
     * 点击更多按钮的渲染
     */
    const loadMore = ()=>{
        if(!loading){
            return (
                <div style={{ textAlign: 'center', marginTop: 12, height: 32, ineHeight: '32px', }}>
                    <Button onClick={onLoadMore}>点击加载更多</Button>
                </div>
            )
        }else{
            return null;
        }
    }
    
    return (
        <div className='forum' style={{margin:"30px 100px"}}>
            <List
                loading={loading}
                itemLayout="horizontal"
                loadMore={loadMore()}
                size="large"
                dataSource={listData}
                renderItem={item => (
                    <Link to={`details/${item.id}`} target='_blank'>
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item
                                key={item.title}
                                actions={[
                                    <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                                    <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                                    <IconText type="message" text="2" key="list-vertical-message" />,
                                ]}
                            >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                description={item.description}
                                />
                                {item.content}
                                <div>
                                    <Row>
                                        <Col span={6}> 
                                            <img width={272} alt="logo" src={item.img[0]} />
                                        </Col>
                                        <Col span={6}> 
                                            <img width={272} alt="logo" src={item.img[1]} />
                                        </Col>
                                        <Col span={6}> 
                                            <img  width={272} alt="logo" src={item.img[2]} />
                                        </Col>
                                    </Row>
                                </div>
                            </List.Item>
                        </Skeleton>
                    </Link>
                )}
            />
        </div>
    )
}
export default Forum;