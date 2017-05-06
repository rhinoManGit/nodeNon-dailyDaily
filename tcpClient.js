/**
 * Created by wd14931 on 2017/5/6.
 */
/*
* 启动一个server文件，同时启动这个client文件
* 同时测试tcp的server和client的合作
*
* */
var net = require('net');

var client = net.connect(8122,function(){
    console.log('[client] client connection!')

    client.write('[client] 发送hello to server!');
});
client.on('data', function(data){
    console.log(data.toString())
    //client.end();
})
client.on('end', function(){
    console.log('[client] client disconnection!')
})