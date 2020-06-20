import React, {useContext,useState, useEffect } from 'react';
import './index.scss';
import {Text} from '../../BaseLayout/NewsHeader/index';
import { Button} from 'antd';

//注销组件
const Logout = props => {
    //引入父组件的上下文方法
    const {userName,logoutClick} = useContext(Text);
    console.log(logoutClick);
    console.log(props.userName);
    return (
        <div className='logout'>
            <Button type='primary'>{userName}</Button>
            &nbsp;&nbsp;
            <Button type='ghost' onClick={logoutClick}>注销用户</Button>
        </div>
    );
}

export default Logout;