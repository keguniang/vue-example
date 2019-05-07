// console.log(__dirname);E:\studyDocument\Vue.js\Day05\webpack-study

var path = require('path');

// 导入在内存中生成HTML页面的插件
// 只要是插件都一定要放到plugins节点中去
/**
 * 该插件的两个作用 ：
 *      1、自动在内存中根据指定页面生成一个内存的页面
 *      2、自动把打包好的bundle.js追加到页面中去
 */
const htmlWebpackPlugin = require('html-webpack-plugin');

// Vue-loader在15.*之后的版本都是需要伴生 VueLoaderPlugin的
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 这个配置文件，其实就是一个JS文件，通过node中的模块操作，向外暴露了一个配置对象
module.exports = {
    // 指定开发模式
    mode : 'development',
    // 入口，要使用webpack打包哪个文件
    entry : path.join(__dirname,'./src/index.js'),
    // 输出文件相关的配置
    output : {
        // 指定打包好的文件输出到哪个目录中去
        path : path.join(__dirname,'./dist'),
        // 指定输出的文件的名称
        filename : 'bundle.js'
    },
    // 这是配置webpack-dev-server命令参数的第二种形式，相对来说，这种方式麻烦一些
    // devServer : {
    //     // --open --port 3000 --contentBase src --hot
    //     open : true,//自动打开浏览器
    //     port :9000,//设置启动时候的运行端口
    //     contentBase : 'src',//指定托管的根目录
    //     hot : true,//启用热更新
    // },

    plugins : [
        // 创建一个在内存中生成HTML页面的插件
        new htmlWebpackPlugin({
            // 指定模板页面，将来会根据指定的页面路径去生成内存中的页面
            template : path.join(__dirname,'./src/index.html'),
            filename : 'index.html',//指定生成的页面的名称
        }),
        new VueLoaderPlugin()
    ],
    // 这个节点，用于配置所有第三方模块加载器
    module : {
        rules : [//所有第三方的匹配规则(模式匹配)
            // 用test匹配到这种模式类型，使用什么加载器
             { test:/\.css$/,use:['style-loader','css-loader'] },//处理css的loader
            //  limit给定的值是图片的大小，单位是byte,如果limit值大于图片的大小，则路径会被转化为base64的字符串,反之，不会转化
            // 这里图片的路径变为url(759270dc66c99e52e61cc7732503f2fd.jpg)，这是因为为了不重名
            // &name=[name].[ext]  传参    [name] 之前叫什么名，还叫什么名；  .[ext]之前是什么后缀，现在还是什么后缀   url(5.jpg)
            // 又想让图片使用之前的名字，又想让图片不重名：采用hash值，hash值是32位的，截取前8位
             { test : /\.(png|jpg|jpeg|bmp|gif)$/,use: 'url-loader?limit=25721&name=[hash:8]-[name].[ext]'},//处理图片路径的loader
             {test : /\.(eot|svg|ttf|woff|woff2)$/, use: 'url-loader'},//处理字体文件的loader
            {test : /\.js$/,use:'babel-loader',exclude : /node_modules/},//配置babel-loader将高级语言转化为低级的
            { test: /\.vue$/,use: 'vue-loader'},//配置vue的loader
            { test: /.scss$/,use:['style-loader','css-loader','sass-loader']},//配置处理scss文件
        ]
    },
    // resolve:{
    //     alias: {//修改Vue被导入时候的包的路径
    //         "vue$" : "vue/dist/vue.js"
    //     }
    // }

}

/**
 * 当我们在控制台直接输入webpack或者webpack-dev-server命令执行的时候，webpack做了以下几步：
 *      1、首先webpack发现，我们并没有通过命令的形式指定入口和出口
 *      2、webpack就会去项目的根目录查找一个叫做  webpack.config.js的配置文件
 *      3、当找到配置文件后，webpack会去解析执行这个配置文件，当解析执行完配置文件后，就得到了配置文件中导出的配置对象
 *      4、当webpack拿到配置对象后，就拿到了配置对象中指定的入口和出口，然后进行打包构件
 */