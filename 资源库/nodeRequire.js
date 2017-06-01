/*在node中,可以使用require()函数来加载模块.
 * require函数使用一个参数,参数值可以带有完整路径的模块的文件名,也可以为模块名.当使用node中提供的模块时,在require函数中只需要指定模块名即可.
 * */
//建立一个页面2.js;代码如下
var name="思思博士";
exports.name=name;
//建立一个页面1.js;代码如下
var two=require("./2.js");
console.log(two.name);
//输出结果:思思博士
/*
 * 在node中所有的脚本文件都是一个模块文件,因此1.js也是一个模块文件,又由于该文件是在命令行窗口中通过node命令被直接运行的,因此在node中该模块文件被定义为应用程序的主模块
 * 可以用如下的方法检测出当前的模块是否是主模块
 * */
if(module===require.main){
    console.log("当前模块时主模块");
}
//输出结果:当前模块时主模块
//2.js代码
var name="思思博士";
console.log(name);
exports.name=name;
//1.js代码:
var two=require("./2.js");
var two=require("./2.js");
//虽然引用了2次,但是只是执行了1次console.log(name)的输出.
/*require.resolve(str)
 * 在node中,可以使用这个函数来查询某个模块文件的带有完整绝对路径的文件名.
 * */
var url=require.resolve("./2");
console.log(url);
//输出结果:E:\node\gys\2.js
/*require.cache
 * 在node中,这个属性代表了所有已被加载模块的缓存区.
 * */
var two=require("./2.js");
var cache=require.cache;
console.log(cache);
/*输出结果:
 * { 'E:\\node\\gys\\1.js':
 { id: '.',
 exports: {},
 parent: null,
 filename: 'E:\\node\\gys\\1.js',
 loaded: false,
 children: [ [Object] ],
 paths:
 [ 'E:\\node\\gys\\node_modules',
 'E:\\node\\node_modules',
 'E:\\node_modules' ] },
 'E:\\node\\gys\\2.js':
 { id: 'E:\\node\\gys\\2.js',
 exports: { name: '思思博士' },
 parent:
 { id: '.',
 exports: {},
 parent: null,
 filename: 'E:\\node\\gys\\1.js',
 loaded: false,
 children: [Object],
 paths: [Object] },
 filename: 'E:\\node\\gys\\2.js',
 loaded: true,
 children: [],
 paths:
 [ 'E:\\node\\gys\\node_modules',
 'E:\\node\\node_modules',
 'E:\\node_modules' ] } }
 * */
//2.js代码
var name="思思博士";
console.log(name);
//1.js代码
//当使用delete关键字删除缓存区中缓存的某个模块对象后,下次加载该模块时将重新运行该模块中的代码.使用代码:
var two=require("./2.js");
var two1=require("./2.js");
console.log("删除前")
delete require.cache[require.resolve("./2.js")];
console.log("删除后");
var two2=require("./2.js");
/*
 * 输出结果:
 * 思思博士
 * 删除前
 * 删除后
 * 思思博士
 * */