import React, {useContext, useState, useEffect } from 'react';
import {Text} from '../../BaseLayout/NewsHeader';
import { Form, Input, Button, Checkbox, message} from 'antd';
import {api,host} from '../../until';

//表单的布局 账号密码输入框的布局
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};
//表单的布局 下面记住我和确定注册的布局
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
  
const Login = props => {

    //使用父组件中这个上下文provider的value变量和方法
    //setModalVisable设置弹窗关闭 loginclick登录成功
    const  {setModalVisable,loginclick} = useContext(Text);

    const onFinish = values => {
        console.log('Success:', values);
        let {account,password} = values;
        //登录判断 数据库判单是否有这个账号密码 如果有返回这个用户的全部数据
        api({
            url:host +'newsLogin',
            args: {
                account,
                password,
            },
            callback: (res) => {
                if(res.code == '401'){
                    message.warn("登录失败，该账户不存在");
                    return 0;
                }else if(res.code == '402'){
                    message.warn("登录失败，密码错误");
                    return 0;
                }else{
                    message.success("登录成功");
                    let userLogin = {userName: res.msg[0].name, userId: res.msg[0].id,userAvatar:res.msg[0].avatar};
                    //调用上下文的方法
                    //登录成功保存用户数据
                    loginclick(userLogin);
                    //设置模态框消失
                    setModalVisable(false);
                }
            }
        });
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Account"
                name="account"
                rules={[
                    {
                        required: true,
                        message: 'Please input your account!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" style={{height:'40px'}}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Login;