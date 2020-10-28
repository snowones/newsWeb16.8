import React, {useReducer,useState, useEffect } from 'react';
import './index.scss';
import {Button,Input,Row,Col,Upload,Modal,Select,message} from 'antd';
//antd v4升级后 拿不到以前的Icon了 换成了SmileOutlined
import { SmileOutlined } from '@ant-design/icons'
import {api,host} from '../../public/until';
const { TextArea } = Input;
const { Option } = Select;

//定义icon
const Icon = props => (
    <span>
        <SmileOutlined type={props.type} />
        {props.text}
    </span>
);

//图片转base64
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

//单独抽出reducer方法
function shareReducer(state, action) {
    switch(action.type) {
        case 'CHANGE_TYPE':
            return {
                ...state,
                title:'',
                subtitle:'',
                content:'',
                img:[],
                previewVisible: false,
                previewImage: '',
                fileList: [],
                type:action.data.type
            }
        case 'SET_WENZHANG_TYPE':
            return{
                ...state,
                wenzhangType:action.data.wenzhangType,
            }
        case 'SET_INPUT_VALUE':
            return{
                ...state,
                ...action.data,
            }
        case 'HANDLE_CANCEL':
            return{
                ...state,
                previewVisible:action.data.previewVisible,
            }
        case 'HANDLE_PREVIEW':
            return{
                ...state,
                previewVisible: true,
                previewImage:action.data.previewImage,
            }
        case 'HANDLE_CHNAGE':
            return{
                ...state,
                fileList:action.data.fileList
            }
        case 'BEFORE_UPLOAD':
            return{
                ...state,
                img:action.data.img
            }
        case 'SUBMIT_SUC':
            return{
                ...state,
                title:'',//标题
                subtitle:'',//大纲
                content:'',//内容
                img:[],//图片
                previewVisible: false,
                previewImage: '',
                fileList: [],
                wenzhangType:1,//文章类别选择框，默认为第一个
            }
        default: 
            return state;
    }
}

//初始化state的参数
const initState = {
    type:1,//本页面展示内容全部根据type切换
    title:'',//标题
    subtitle:'',//大纲
    content:'',//内容
    img:[],//图片
    previewVisible: false,//预览图片的弹窗
    previewImage: '',//预览的图片
    fileList: [],//上传的图片列表
    wenzhangType:1,//文章类别选择框，默认为第一个
}

//文章和帖子的详情页面
const Share = props => {
    //通过使用useReducer代替useState,统一管理share组件下的全部状态 
    //不再单独定义每一个状态还有每个状态改变的触发函数 通过initState统一定义 通过reducer统一处理
    const [state, dispatch] = useReducer(shareReducer, initState);

    //切换导航 上传文章和上传帖子的切换
    const changeType = (type)=>{
        dispatch({
            type:'CHANGE_TYPE',
            data:{
                type,
            }
        })
    }

    //根据type展示header
    const showHeader =()=>{
        let {type} = state;
        if(type == 1){
            return (
                <Button.Group size='large'>
                    <Button type="primary" onClick ={()=>{changeType(1)}}>
                        <Icon type="left" />
                        发布文章
                    </Button>
                    <Button type="normal" onClick ={()=>{changeType(2)}}>
                        分布帖子
                        <Icon type="right" />
                    </Button>
                </Button.Group>
            )
        }else if(type == 2){
            return (
                <Button.Group size='large'>
                    <Button type="normal" onClick ={()=>{changeType(1)}}>
                        <Icon type="left" />
                        发布文章
                    </Button>
                    <Button type="primary" onClick ={()=>{changeType(2)}}>
                        分布帖子
                        <Icon type="right" />
                    </Button>
                </Button.Group>
            )
        }
    }

    //type1 展示发表文章得表单 type2展示发表帖子得表单
    const showform = ()=>{
        //上传按钮
        const { previewVisible, previewImage, fileList } = state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        //分类处理
        let {type} = state;
        let content = {}
        //文章和帖子的提示内容不同
        if(type == 1){
           content.title = '文章标题';
           content.titleWarn = '请输入文章标题';
           content.subtile = '文章大纲';
           content.subtitleWarn = '请输入文章大纲';
           content.content = '文章内容';
           content.congtentWarn = '请输入文章内容';
           content.img = '文章图片'
           content.imgLength = 1;
           content.Button = '发表文章';
        }else if(type == 2){
            content.title = '帖子标题';
            content.titleWarn = '请输入帖子标题';
            content.subtile = '帖子类别';
            content.subtitleWarn ='请输入帖子类别';
            content.content = '帖子内容';
            content.congtentWarn = '请输入帖子内容';
            content.img = '帖子图片'
            content.imgLength = 3;
            content.Button = '发表帖子';
        }

        return(
           <div>
                <Row className ='item-img'>
                    <Col span={4}>{content.img}</Col>
                    <Col span={20} >
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload = {beforeUpload}
                        >
                            {fileList.length >= content.imgLength ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Col>
                </Row>
                <Row className ='item'>
                    <Col span={4}>{content.title}</Col>
                    <Col span={20} ><Input value = {state.title} onChange = {(e) => {changeInput('title',e)} }  placeholder={content.titleWarn} /></Col>
                </Row>
                <Row className ='item'>
                    <Col span={4}>{content.subtile}</Col>
                    <Col span={20} ><Input value = {state.subtitle} onChange = {(e) => {changeInput('subtitle',e)} }  placeholder={content.subtitleWarn} /></Col>
                </Row>
                <Row className ='item'>
                    <Col span={4}>{content.content}</Col>
                    <Col span={20} ><TextArea  autoSize={{ minRows: 6, maxRows: 20 }} value = {state.content} onChange = {(e) => {changeInput('content',e)} }  placeholder={content.congtentWarn} /></Col>
                </Row>
                <Row className ='item' style={{marginTop:'30px'}}>
                    <Col offset={6} span={12}> 
                        <Button type="primary" block onClick={()=>{submit()}}>
                            {content.Button}
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }

    
    //选择文章类别
    const showWenzhangType = ()=>{
        let {type} = state;
        if(type == 1){
            return(
                <Row className ='item'>
                    <Col span={4}>文章类目</Col>
                    <Col span={5} >
                        <Select defaultValue="呼吸道疾病" style={{ width: 220 }} onChange={selectChange}>
                            <Option value="1">呼吸道疾病</Option>
                            <Option value="2">传染类疾病</Option>
                            <Option value="3">口腔疾病</Option>
                            <Option value="4">皮肤疾病</Option>
                            <Option value="5">肠道疾病</Option>
                        </Select>
                    </Col>
                </Row>
            )
        }
    }

    //选择的值
    const selectChange = (value)=>{
        dispatch({
            type:'SET_WENZHANG_TYPE',
            data:{
                wenzhangType:value,
            }
        })
    }

    ///input框内数据实时修改
	//input onchange触发
	const changeInput = (type, e) => {
        dispatch({
            type:'SET_INPUT_VALUE',
            data:{
                [type] : e.target.value
            }
        })
    }

    //上传图片
    //关闭
    const handleCancel = () => {
        dispatch({
            type:'HANDLE_CANCEL',
            data:{
                previewVisible: false
            }
        })
    }

    //预览图片
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        dispatch({
            type:'HANDLE_PREVIEW',
            data:{
                previewImage: file.url || file.preview,
            }
        })
    };

    //上传照片触发
    const handleChange =async ({file,fileList})=> {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        dispatch({
            type:'HANDLE_CHNAGE',
            data:{
                fileList
            }
        })
    };

	//上传文件之前的钩子，参数为上传的文件
	const beforeUpload = (file) => {
		let formData = new FormData();
		formData.append('file', file);
		fetch('http://182.92.64.245/tp5/public/index.php/index/index/savaImgToOss', {
			method:'post',
			body: formData
		}).then(response => response.json())
		.catch(error => console.error('Error:', error))
		.then(response => {
            let msg = response.msg;
            let img = state.img;
            img.push(msg);
            dispatch({
                type:'BEFORE_UPLOAD',
                data:{
                    img
                }
            })
		})
    }
    
    //点击上传 如果type是1 就是上传文章 如果type是2 就是上传帖子
    const submit = ()=>{
        let {type,title,subtitle,content,img,wenzhangType} = state;
        if( !type || !title || !subtitle || !content || !img || !wenzhangType ) {
            message.warning('请把信息输入完整');
            return 0;
        }
        //拿到用户id
        let user_id = localStorage.userId;
        if(!user_id){
            message.warning('请登录');
            return 0;
        }
        //转为字符串
        img = JSON.stringify(img);
        if(type == 2){
            //如果type为2说明是帖子 也就没有这个属性
            wenzhangType = 0;
        }
        //把数据全部存入数据库然后把页面数据清空
        api({
            url:host + 'newsInsertConent',
            args: {
                user_id,
                title,
                subtitle,
                content,
                img,
                wenzhangType,
                type
            },
            callback: (res) => {
                message.success('上传成功');

                dispatch({
                    type:'SUBMIT_SUC'
                })
            }
        });
    }

    return (
        <div className='share'>
            <div className='header'>
                {/* 用于切换上传内容的组件 */}
                {showHeader()}
            </div>
            <div className='form'>
                {/* 上传文章时需要选择文章的类别 */}
                {showWenzhangType()}
                {/* 用户上传需要填写的表单 */}
                {showform()}
            </div>
        </div>
    );
}

export default Share;