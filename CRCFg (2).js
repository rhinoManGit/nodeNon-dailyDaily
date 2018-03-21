/*
*   防爬校验, 校验规则
*   先根据cookie 中判断有没有hex || crc
*
*
* 1，借鉴crc校验规则生成一段原信息（二进制）
* 2，生成一个R+1位多项式除数
* 3，根据多项式生成一个R位crc校验码
* 4，将校验码传到后端做解析校验
* W(x) = i1+i2+i3+i4... 总值等于1；
* O(x) = i1x+i2y+i3z+i4j... 得到信息源
* var wMatrix = [
        i1,
        i2,
        i3,
        i4,
        ...
    ]
*   var tMatrix = [ x1, x2, x3, x3, x4, ...]
*   crc 有，根据redis判断合法性，
*   合法，统计频次
*   不合法，直接拦截
*
*   如果指纹校验不通过的，直接返回403；
*   如果指纹通过了，但是访问频率较高的，返回403，强制这个接口拦截3分钟
*
*   redis存三套数据
*   1， 指纹列表
*   2， 当前的请求记录： 指纹+接口
*
*   getPixels      : is required;
*   filterInterface: is required;
* */
var pool = require('./../mysql').Pool();
var protectdeInterfaceList = require('./interface').protectedInterface;
// static
var times         = 300,               // 1 秒10次，一分钟600
    time          = 120,             // todo  10次
    cacheTime     = 60 * 60 * 24 * 10, // 指纹在redis的缓存时间(s) == 指纹在浏览器中的存活时间
    interceptTime = 3 * 60;            // 访问频率过高的用户，设置拦截锁定时间(s)

/*
* generate a Model track interface
* @param{string} : crc is fingerprinter
*
* */
var Cell = function Cell(crc, url) {

    var obj = {};

    obj['id']    = crc + url;
    // 指纹
    obj['crc']   = crc;
    // 接口
    obj['url']   = url;
    // 当前频次
    obj['count'] = 1;

    return obj;
}
async function writeCrcIntoRedis(val) {

    var arr = await new Promise(function (resolve, reject) {

        var result = redisAsync.get('duj-fingerprint', true, 2);
        resolve(result);
    })

    var original = arr? arr.split('|') : [];

    if(original.indexOf(val) !== -1)
        return ;

    original.push(val);

    var arr2 = await new Promise(function (resolve, reject) {

        var result2 = redisAsync.set('duj-fingerprint', original.join('|'), cacheTime);

        resolve(result2);
    })

    return arr2;
}
async function writeCellIntoRedis(obj, t = time) {

    var ok = await new Promise(function (resolve, reject) {

        var result = redisAsync.set(obj['id'], JSON.stringify(obj), t);

        resolve(result);
    })

    return ok;
}
async function readCrcFromRedisList(key = 'duj-fingerprint') {

    var ori = await new Promise(function (resolve, reject) {
        var arr = redisAsync.get(key, true, 2);

        resolve(arr);
    })
    var original = ori? ori.split('|') : [];

    return original;
}
async function readCellFromRedisCell(key) {

    var ori = await new Promise(function (resolve, reject) {
        var o = redisAsync.get(key, true, 2);

        resolve(o);
    })

    return  ori ? JSON.parse(ori) : null;
}

//
// 异步处理
//
function writeDataIntoDB(pool, sql, obj) {

    pool.getConnection(function(err, connection) {

        var d = new Date;
        var triggerTime = [
            d.getFullYear(),
            d.getMonth() +1,
            d.getDate()
        ].join('-') + ' ' + ([
            d.getHours(),
            d.getMinutes(),
            d.getSeconds()
        ].join(':'))
            // Use the connection
        connection.query('SELECT * FROM TCTourismResourcePoolShare.TCTourismTrainCalendarPrice' +
            ' LIMIT 0, 10\n', function (error, results, fields) {

            // And done with the connection.
            connection.release();

            console.log('AAAAAAAAAAAAAAA', results)

            // Handle error after the release.
            if (error) throw error;

            // Don't use the connection here, it has been returned to the pool.
        });
    });
}
/*
* 二进制模二除法
* */
function M2(aGx, aOx) {

    var R = aGx.length - 1;

    // delete null in array
    var deleteNull = function (arr) {
        if(!arr) return '';

        arr.forEach(function (e, i) {
            if(e === null) arr.splice(i, 1);
        })
    }
    // 自动补位
    var fillLeft = function (L, N) {

        for(; 0 < L - N.length; ){
            N = '0' + N;
        }

        return N;
    }

    var len = aGx.length;

    for(var i = 0; i < len; ){

        if(aOx.length < len){
            return fillLeft(R, aOx.join(''));
        }

        // 向后移动
        var bMove = true;

        for(var j = 0; j < len; j++){

            if(aOx[j] - 0 === aGx[j] - 0){

                if(bMove){
                    aOx[j] = null;
                }else
                    aOx[j] = 0;
            }else{
                bMove = false;
                aOx[j] = 1;
            }
        }

        deleteNull(aOx);
    }
}
/*
* interceptInterfacing
* @param{object} : res is response
* @param{Boolean}: isHighConcurrency 是高频强刷的？非浏览器正式的访问？
* @param{object} : obj 当前访问的接口对象
*
* */
var interceptInterfacing = function (res, isHighConcurrency = false, obj = null) {

    // todo 报警拦截， 并记录
    if(isHighConcurrency)
    {
        console.log('[拦截]： Hostile Attack--- Browser: Burst brush.........');
    }else
    {
        // clean invalid client cookie, let them again generate
        res.clearCookie('dj-crc');
        res.clearCookie('dj-hex');

        console.log('[拦截]： Illegal Hex--- Server： spider .........');
    }

    /*
    * 1，获取爬虫信息
    * 2，写入库
    * */

    res.statusCode = 403;
    res.end('illegal request');
    return;
}
/*
* check fingerprinter & [CRCCode, crc] is lawful
* @param{object} : req request
* @param{object} : res response
* @param{string} : fingerprinter 指纹
* @param{function} : nextFn check pass, than exec nextFn
* */
async function Checking(req, res, nextFn) {

    var fingerprinter = req.cookies['dj-crc'] || null;
    var CRCCode       = req.cookies['dj-hex'] || null;
    var clientIp      = req.socket['remoteAddress'] || req.connection._peername['address'] || '10.1.1.1';
    var originalUrl   = req.url.replace(/\?(.*)+/g, '');
    var url           = originalUrl.replace(/\//g, '_');

    // is unin protected list
    if(protectdeInterfaceList.indexOf(originalUrl) === -1)
    {
        // next
        nextFn(req, res);
        return;
    }

    // is server spider
    if((!fingerprinter && !CRCCode) || typeof (CRCCode - 0) !== 'number')
    {
        interceptInterfacing(res);
        return;
    }

    if(fingerprinter)
    {
        // 获取redis中的指纹列表
        var fingerprinterList = await readCrcFromRedisList();
        console.log('crc.................., redis: ', clientIp)

        //writeDataIntoDB(pool);

        // redis existence
        if(fingerprinterList.indexOf(fingerprinter) !== -1)
        {
            var key = fingerprinter + url;

            var oCell = await readCellFromRedisCell(key);

            // 过期，自动销毁
            if(!oCell)
            {
                var obj = Cell(fingerprinter, url);

                await writeCellIntoRedis(obj)

                nextFn(req, res);
                return;
            }

            if(oCell['count'] <= times)
            {
                oCell['count']++;

                await writeCellIntoRedis(oCell)

                nextFn(req, res);
                return;
            }
            else
            {
                await writeCellIntoRedis(oCell, interceptTime);

                interceptInterfacing(res, true, oCell);
            }
        }
        else
            interceptInterfacing(res);
    }
    else if(CRCCode)
    {
        console.log('CRCCode..................')

        var info  = CRCCode.split('|'),
            bInfo = info[0],
            Gx    = info[1],  //多项式
            FP    = bInfo.substr(0, bInfo.length - Gx.length - 1); //指纹

        // Gx, bInfo 类型校验
        if(Gx !== Gx || bInfo !== bInfo || typeof (Gx - 0)
            !== 'number' || typeof (bInfo - 0) !== 'number'){
            interceptInterfacing(res);
        }

        var result = M2(Gx.split(''), bInfo.split(''));         // CRC 校验通过

        if(result - 0 === 0){

            // pass + client ip Improve security
            var onlyIp  = clientIp.replace(/[\:a-zA-Z]/g, '');
            var toArray = onlyIp.split('.');
            var onlyNum = 1;

            toArray.splice(0, 1), toArray.forEach(function (e) {
                onlyNum *= e;
            });

            // Be Born CRC
            var CRC = (parseInt(FP, 2)+ onlyNum).toString(16);
            // track
            var fstCell = Cell(CRC, url);
            // write for cookie
            res.setHeader('Set-Cookie', 'dj-crc=' + CRC + '; path=/; max-age=' + cacheTime);
            // clean hex
            res.clearCookie('dj-hex');
            // write crc into redis
            await writeCrcIntoRedis(CRC);
            // write Cell into redis
            await writeCellIntoRedis(fstCell);
            // Fetch
            nextFn(req, res);
            return;
        }else{
            interceptInterfacing(res);
        }
    }
}

exports.Checking = Checking;
