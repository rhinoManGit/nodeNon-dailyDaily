/*
* @�������ڴ����
* ��ʵ����һ�δ��뵽�׻�ռ�ö����ڴ棬��ʵ����ϸ�����㣬ֻ��Ҫ���������Ķ���͹��ˣ�
* ��Ϊ�������ڶ����ʱ��ѡ�����������ͣ��Լ��ƶ��˶����ֽڣ������������ڴ�ĺ���ԭ��
* ��ʲô�����߼�������û�й�ϵ�ģ����磺��һ��������������˶��ٶ���������Ҫ�ģ�������
* ����ѡ����ô�ڷŲ���Ҫ��
*
* @nodejs ��buffer������ͷ�buffer(array, string, number, null, undefined,NaN)����Ķ����б��ʵ�����
* ��Ϊ��������Ķ������ڶ��ڴ��ж���ģ���buffer����Ķ������ڶ����ڴ��ж����
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
 *  // ������һ��Ԫ��ռ8���ֽڣ�
 *  1 byte���ֽڣ� = 8 bit
 * 1 ��ĸ = 1 byte = 8 bit(λ)
 * 1 ���� = 2 byte = 16 bit
 * 1B=8b
 * 1KB=1024B
 * 1MB=1024KB
 * 1GB=1024MB
 *
 * */

//new Array(20 * 1024 * 1024); // ���Ծ�ռ����20 * 1024 * 1024 ���ֽ� 160M
// ���۾���������ÿ��Ԫ��ռһ��8�ֽڣ���8byte = 8 * 8 bit
// ���굽�������ݽṹ���棬�����ı��������ռ�м����ַ��أ�Ӧ����ֻ��1-2���ַ�
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

// 2�� ------------------------------------------
/*
* ����ռ�ڴ�����������ڴ棩
*
* */
/*var total = [];

for(var j = 0; j < 15; j++){
    showMem();
    total.push(useMem());
}*/

// -----------------------------------------------

// 3�� ------------------------------------------
/*
 * ��buffer���棬ʹ�ö����ڴ�, ��ʱ�ڴ沢û���������rss���ڴ�ռ��һֱ������
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