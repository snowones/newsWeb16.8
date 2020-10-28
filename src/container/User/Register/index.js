import React, {useContext, useState, useEffect } from 'react';
import {Text} from '../../BaseLayout/NewsHeader';
import { Form, Input, Button, message, Upload, Modal} from 'antd';
//antd v4升级后 拿不到以前的Icon了 换成了SmileOutlined
import { SmileOutlined } from '@ant-design/icons'
import {api,host} from '../../../public/until';

//定义icon
const Icon = props => (
    <span>
        <SmileOutlined type={props.type} style={{ marginRight: 8 }} />
        {props.text}
    </span>
);


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

const uploadButton = (
    <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
    </div>
);

const Register = props => { 
    //使用父组件中这个上下文provider的value变量和方法
    //setModalVisable设置弹窗关闭 loginclick登录成功
    const {setModalVisable,loginclick} = useContext(Text);

    const [avatar,setAvatar] = useState('');//用户上传的头像
    const [previewVisible,setPreviewVisible] = useState(false);//上传头像的弹窗
    const [previewImage,setPreviewImage] = useState('');//预览头像的链接
    const [fileList,setFileList] = useState([]);//用户上传的图片列表 这里只让传一张

    //form表单点击确定成功的时候
    const onFinish = values => {
        console.log('Success:', values);
        //取出表单内的值
        let {account,name,passwordFirst,passwordSecond} = values;
        if(passwordFirst !== passwordSecond){
            message.warn('两次密码输入不一致');
            return 0;
        }
        //如果用户没设置头像提示他去设置头像
        if(!avatar){
            message.warn('请设置头像');
            return 0;
        }

        //请求注册接口
        api({
            url:host +'newsCreateUser',
            args: {
                name,
                account,
                password:passwordFirst,
                avatar
            },
            callback: (res) => {
                console.log(res);
                if(res.code == '400'){
                    message.warn("注册失败，该账户已存在");
                }else{
                    message.success("注册成功,并为您自动登录");
                    let id  = res.data[0].id;
                    let userLogin = {userName: name, userId: id,userAvatar:avatar};
                    //调用上下文的方法
                    //注册成功自动为用户登录
                    loginclick(userLogin);
                    //设置模态框消失
                    setModalVisable(false);
                }
            }
        });
        
    };
    //form表单点击确定失败的时候 (通过表单绑定的验证没有通过)
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    //把图片转为base64
    const getBase64 = (file)=>{
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    //关闭上传图片的弹窗
    const handleCancel = ()=>{
        setPreviewVisible(false);
    }

    //预览图片
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        //修改状态
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };

    //上传图片
    const handleChange = ({ fileList }) => setFileList(fileList);
    
    /**
	 * zyx
	 * 2019.10.21
	 * 上传文件之前的钩子，参数为上传的文件
	 */
	const beforeUpload = (file) => {
		let formData = new FormData();
		formData.append('file', file);
		fetch('http://182.92.64.245/tp5/public/index.php/index/index/savaImgToOss', {
			method:'post',
			body: formData
		}).then(response => response.json())
		.catch(error => console.error('Error:', error))
		.then(response => {
            let img = response.msg;
            //设置头像地址
            setAvatar(img);
		})
    }
    return (
        <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: '请输入您的昵称',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Account"
                name="account"
                rules={[
                    {
                        required: true,
                        message: '请输入您的账号',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="passwordFirst"
                rules={[
                    {
                        required: true,
                        message: '请输入您的密码',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="确认密码"
                name="passwordSecond"
                rules={[
                    {
                        required: true,
                        message: '请再次输入您的密码',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item 
                label="头像"
            >
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload = {beforeUpload}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" style={{height:'40px'}}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Register;