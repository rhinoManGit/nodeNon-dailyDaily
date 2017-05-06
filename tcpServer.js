/**
 * Created by wd14931 on 2017/5/6.
 */
/*
 *
 * 用telnet工具来做测试，telnet作为客户端
 * tcpserver是同时可以和多个client保持连接的
 *
 * tcp针对网络中的小数据包有一定的优化策略：nagle算法，见@nagle.js
 * 如果每次发送的都是小数据包的话，每个数据里面其实有效数据很少，浪费网络。
 * nagle算法的原理是等到缓存区里面的包达到了一定大小或者一定时间之后再发送。所以nagle算法会将
 * 包进行合并再发送，这种会让网络有效利用，但是同时会导致一个问题是消息传递会有延迟
 * 在Node中，由于TCP默认是开启了Nagle算法，可以调用socket.setNoDelay(true)去掉Nagle算法。使得
 *  write()可以立即发送到数据网络中。
 *  另一个需要注意的是，尽管在网络的一端调用了write()会触发另一端的data事件，但是并不是意味着
 *  每次write（）都会触发一次data事件，在关闭掉Nagle算法后，另一端可能会将接收到的多个小数据包合并，然后只触发一次data事件。
 * */
var net = require('net');

var server = net.createServer(function(socket){

    // 新建连接
    socket.on('data', function(data){
        socket.write('[server] 发送 hello word to client........!');
        socket.write(data);
    })

    // 链接断开
    socket.on('end', function(){
        socket.write('[server] 链接断开....!')
    })

    socket.write('[server] 欢迎光临!')
});

server.listen(8122, function(){
    console.log('[server] server bound!')
});