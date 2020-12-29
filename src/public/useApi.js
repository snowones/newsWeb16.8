//封装一个api
import React, { useState, useEffect , useRef } from 'react';

//请求的url 请求的参数 初始化的结果 是否立即执行
const useApi = (url,args='',initRes,execute) => {
    const abortController = useRef();//全局设定AbortController
    //loading
    const [loading,setLoading] = useState(false);
    //结果
    const [result,setResult] = useState(initRes);

    const beginFetch = ()=>{
        abortController.current = new AbortController();
        //开启loading
        setLoading(true);
        //拼接参数
        let argsStr = '';
        if(args!=''){
            for(let key in args) {
                argsStr += key + '=' + args[key] + '&';
            }
            argsStr = '?' + argsStr.substr(0, argsStr.length-1);
        }
        console.log('查看请求地址')
        console.log(url+argsStr)
         //请求
         fetch(url+argsStr, {
            // 这里传入 signal 进行关联
            signal: abortController.current.signal,
        })
        .then(response => response.json())
        .then(response => {
            setResult(response)
            console.log(response);
        })
        .finally(() => setLoading(false))
        .catch((e)=>{console.log(e)})

    }

    useEffect(()=>{
        //看是否需要立即请求
        console.log('是否执行');
        console.log(execute);
        execute && beginFetch();
        //组件清除时终止请求
        return () => {
            console.log('我已经销毁了');
            abortController.current.abort()
        }
    },[])

    return{ result,loading,beginFetch }  
}

export default useApi;