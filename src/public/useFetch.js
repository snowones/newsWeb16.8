//自定义fetchhook  封装组件卸载自动结束未完成的请求功能和loading功能
import React, { useState, useEffect , useRef } from 'react';

const useFetch = (url,args) => {
    const abortController = useRef();//全局设定AbortController
    //loading
    const [loading,setLoading] = useState(false);
    //结果
    const [result,setResult] = useState();

    //开启请求的方法
    const beginFetch = ()=>{
        console.log(url);
        console.log(args);

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
        .then(response => setResult(response))
        .finally(() => setLoading(false));

    }

    useEffect(()=>{
        //组件清除时终止请求
        return () => {
            console.log('我已经销毁了');
            abortController.current.abort()
        }
    },[])

    return{ result,loading,beginFetch }  
}

export default useFetch;