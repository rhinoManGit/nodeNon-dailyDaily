/**
 * Created by wd14931 on 2017/5/6.
 *
 * http的测试可以用工具curl，也可以用浏览器
 *
 * Http req对象
 * function (req, res){
 *  //console.log(req.header);
 *  var buffers = []
 *  req.on('data', function(trunk){
 *  buffers.push(trunk)
 *  }).on('end', function(){
 *      var buffer = Buffer.concat(buffers);
 *
 *      // TODO
 *      res.end('hello word');
 *  })
 * }
 * 由上面的可以看出来，报文部分（req）则抽象为一个只读流（读的流意思是读取一个请求中传过来的数据），
 * 如果业务逻辑需要读取报文体中的数据，则需要在这个数据流结束后才能进行。
 *
 * （站在服务端看，本来是站点服务端看的，客户端那有req和res，
 * **********, 可读，可写流都是相对于连接，写入连接，读取连接中的东西）
 * 即，从上面的代码可以看出来request就是一个只读流，读取用户http请求传上来的数据。等这个只
 * 读流完成之后才能做一些业务逻辑的处理。哈哈哈
 * 同理，res是一个只写流，因为它会调用write()将自己带的数据写入到客户端。哈哈
 *
 * Http res对象（响应对象）
 * 可以将其看作成一个可写的流对象，它的响应报文头部的信息的API为res.setHeader()和res.writeHead()。
 * 如：res.writeHead(200, {'Content-Type': 'text/plain'})
 * 其分为setHeader()和writeHead()两个步骤，我们可以调用setHeader进行多次设置，但是只会调用writeHead后
 * 报文才会写入到连接中。除此之外，http模块会自动帮你设置一些头部信息。
 * 报文体部分则是调用res.write（）和res.end()方法实现的，后者与前者的差别在于res.end()会先调用write()
 * 发送数据，然后发送信号告知服务器这次响应结束。
 * 注意：报文头是在报文体发送前发送的，一旦开始了数据的发送，writeHead()和setHeader()将不再生效，这是
 * 由协议的特性决定的。
 *
 *  HTTP代理
 *  如同服务端实现一般，http提供的ClientRequest对象（就是一个想服务端发请求的代理，如，ajax）
 *  也是基于TCP层实现的。在keepalive的情况下，一个底层会话连接可以多次用于请求（建立一个长连接，
 *  基于TCP的，建立一次回话之后就可以发送几次请求），为了重用TCP连接，http模块包含了一个默认的
 *  客户端代理对象http.globalAgent.它对每个服务端（host+port）创建的链接进行了管理，默认情况下，
 *  通过ClientRequest对象对同一个服务器端发起的http请求最多可以创建5个连接，它实质上是一个连接池。
 *
 *
 * 调用http客户端同时对一个服务器发送10次请求，其实质上只有5次请求是处于并发状态
 * ，后续的请求需要等待某个请求完成了服务后才能真正发出，与浏览器对同一个域名有下
 * 载现在是相同的行为。
 *
 */
var http = require('http');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('hello word!');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337')