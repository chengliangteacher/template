




export const BaseConfig = {
    //=====================================开发环境====================================//
    /* 
        @description  本地环境process.env.NODE_ENV自动转换为prodection，会使用下面的服务器地址
        @autor        shuxiaokai
        @create       2019-05-12 11:47"
    */
    devUrl: "/", //--------------------------------------------------开发服务器
    devImgUrl: "/common/single", //---------------------------------开发图片服务器
    // devUrl: "http://192.168.0.198:8010/pt", //------------------------------------------------开发服务器
    // devImgUrl: "http://192.168.0.198:8010/pt/common/single", //-------------------------------开发图片服务器
    

    //=====================================线上环境====================================//
    /* 
        @description  打包后process.env.NODE_ENV自动转换为development，会使用下面的服务器地址
        @autor        shuxiaokai
        @create       2019-05-12 11:46"
    */
    proUrl: "/", //-----------------------------------------------------线上服务器
    proImgUrl: "/common/single", //------------------------------------线上图片服务器


    //=====================================其他配置====================================//
    enableMock: true, //是否允许开启mock
    enableHttpTest: true, //是否开启http请求工具
}





