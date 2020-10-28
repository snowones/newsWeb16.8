var Tools = {
    // fetch接口封装
    api: function({ url, args='', callback }) {
        let argsStr = '';
        if(args!='') {
            for(let key in args) {
                argsStr += key + '=' + args[key] + '&';
            }
            argsStr = '?' + argsStr.substr(0, argsStr.length-1);
        }
        
        fetch(url+argsStr)
        .then(response => response.json())
        .then(res => {
            callback(res);
        });
    },
    /**
     * zyx
     * 2019/10.22
     * 时间戳转时间‘YYYY-MM-DD HH:mm:ss’
     */
    time : function(time){
        //从数据库拿出来的时间戳是字符串形式 需要转化为数字
        time = parseInt(time);
        // 增加8小时
        let date = new Date(time + 8 * 3600 * 1000); 
        return date.toJSON().substr(0, 19).replace('T', ' ');
        //Date的‘toJSON’方法返回格林威治时间的JSON格式字符串，实际是使用‘toISOString’方法的结果。
        //字符串形如‘2018-08-09T10:20:54.396Z’，转化为北京时间需要额外增加八个时区，
        //我们需要取字符串前19位，然后把‘T’替换为空格，即是我们需要的时间格式。
    }
}

export const api = Tools.api.bind(Tools);
//host 请求地址
export const host = 'http://182.92.64.245/tp5/public/index.php/index/index/';
export const time = Tools.time.bind(Tools);