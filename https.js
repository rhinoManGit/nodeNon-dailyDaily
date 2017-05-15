/**
 * Created by wd14931 on 2017/5/11.
 *
 *
 * 参考文案 http://www.cnblogs.com/yangyquin/p/5284530.html
 *
 */
var net = require('net');
var client = net.connect('10.101.140.97:80', function(res){

})
client.send('hello')
client.on('data', function(data){

    })
