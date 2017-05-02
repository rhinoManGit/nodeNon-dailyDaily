/*
 * @第五章内存控制
 * 其实分析一段代码到底会占用多少内存，其实不用细看运算，只需要看看变量的定义就够了；
 * 因为，变量在定义的时候选择了那种类型，以及制定了多少字节，这个就是这个内存的耗用原则；
 * 与什么样的逻辑代码是没有关系的，比如：在一个屋子里面你放了多少东西是最重要的，但是至
 * 于你选择怎么摆放不重要。
 *
 * @nodejs 中buffer对象定义和非buffer(array, string, number, null, undefined,NaN)对象的定义有本质的区别
 * 因为其他对象的定义是在堆内存中定义的；而buffer对象的定义是在堆外内存中定义的
 *
 * */

var showMem = function(){
    var mem = process.memoryUsage();
    var format = function(bytes){
        return (bytes / 1024 / 1024).toFixed(2) + "MB";
    }

    console.log('Process: heapTotal '+ format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
    console.log('------------------------------------------------------')
}

// 1.  ----------------------------------------------
//showMem();
/*
 *  // 数组中一个元素占8个字节，
 *  1 byte（字节） = 8 bit
 * 1 字母 = 1 byte = 8 bit(位)
 * 1 汉字 = 2 byte = 16 bit
 * 1B=8b
 * 1KB=1024B
 * 1MB=1024KB
 * 1GB=1024MB
 *
 * */

//new Array(20 * 1024 * 1024); // 所以就占用了20 * 1024 * 1024 个字节 160M
// 结论就是数组中每个元素占一个8字节，即8byte = 8 * 8 bit
// 引申到其他数据结构上面，其他的变量定义会占有几个字符呢？应该是只有1-2个字符
//showMem();
// ----------------------------------------------

var useMem = function(){
    var size = 20 * 1024 * 1024;
    var arr = new Array(size);

    for(var i = 0; i < size; i++){
        arr[i] = 0;
    }

    return arr;
}

// 2。 ------------------------------------------
/*
 * 数据占内存溢出（堆内内存）
 *
 * */
/*var total = [];
 for(var j = 0; j < 15; j++){
 showMem();
 total.push(useMem());
 }*/

// -----------------------------------------------

// 3。 ------------------------------------------
/*
 * 用buffer代替，使用堆外内存, 此时内存并没有溢出来，rss的内存占用一直在增加
 *
 * */
var useMem1 = function(){
    var size = 200 * 1024 * 1024;
    var buffer = new Buffer(size);

    for(var i = 0; i < size; i++){
        buffer[i] = 0;
    }

    return buffer;
}

var total = [];

for(var j = 0; j < 15; j++){
    showMem();
    total.push(useMem1());
}
// -----------------------------------------------