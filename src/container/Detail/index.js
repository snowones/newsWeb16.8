import React, {useState, useEffect } from 'react';
import './index.scss';
import { Comment, Avatar, Form, Button, List, Input, message } from 'antd';
import {api,host} from '../../public/until';
const { TextArea } = Input;

//输入评论列表
const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);
//输入评论框
const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);

//拿出来当前登录用户的数据
const {userId,userName,userAvatar } = localStorage;

//文章和帖子的详情页面
const Detail = props => {

    const [comments,setComments] = useState([]);//全部的评论内容
    const [submitting,setSubmitting] = useState(false);//点击评论提交
    const [value,setValue] = useState('');//提交的评论内容
    const [data,setData] = useState({});//文章或是帖子的详情内容
    
    //componentDidmount
    useEffect(()=>{
        //把页面导航去掉
        let nav = document.getElementsByClassName('nav');
        nav[0].style.display='none';
        //拿到帖子数据
        console.log(props);
        let id = props.match.params.uniquekey;
        api({
            url:host + 'newsSelectContentByType',
            args: {
                id,
            },
            callback: (res) => {
                showData(res);
            }
        });
        getCommentData();
    },[])

     /**
     * zyx
     * 2020/6/28
     * 处理数据文章数据
     */
    const showData = (data)=>{
        //临时存放数据
        let handleData = {};
        handleData.content =data[0].content;
        setData(handleData)
    }

    /**
     * zyx
     * 2020/6/18
     * 拿评论数据
     */
    const getCommentData = ()=>{
        let pid = props.match.params.uniquekey;
        api({
            url:host + 'newsSelectAllComment',
            args: {
                pid,
            },
            callback: (res) => {
                showCommentData(res);
            }
        });
    }

     /**
     * zyx
     * 2020/6/18
     * 处理评论数据
     */
    const showCommentData = (data) =>{
        let tempData = [];
        for (let i = 0; i < data.length; i++) {
            tempData.push({
                id: data[i].id,
                author: data[i].name,
                avatar: data[i].avatar,
                content: data[i].content,
                datatime:data[i].create_time,
            });
        }

        setComments(tempData);
    }


    //插入文章评论
    const insertCommentData = ()=>{
        let pid = props.match.params.uniquekey;
        let comment = value;
        if(!userId){
            message.warn("请先登录");
            return 0;
        }
        api({
            url:host + 'newsInsertComment',
            args: {
                user_id:userId,
                pid,
                content:comment,
            },
            callback: (res) => {
                getCommentData();
                setSubmitting(false);
                setValue('')
            }
        });
    }

    //点击提交评论
    const handleSubmit = () => {
        if (!value) {
            return;
        }
        setSubmitting(true);
        //动画暂停
        setTimeout(() => {
            insertCommentData();
        }, 1000);
    };
    
    //评论框内容填写
    const handleChange = e => {
        setValue(e.target.value);
    };

    return (
        <div className='detail'>
                <div style={{marginBottom:'30px'}}>
                    {data.content}
                </div>
                {comments.length > 0 && <CommentList comments={comments} />}
                <Comment
                    avatar={
                        <Avatar
                        src={userAvatar}
                        alt={userName}
                        />
                    }
                    content={
                        <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                        />
                    }
                />
            </div>
    );
}

export default Detail;