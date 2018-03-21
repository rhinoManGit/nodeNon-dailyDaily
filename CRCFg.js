/*
*  生成校验密文 dhash
*  规则：
*  页面加载进来之后先判断cookie中的CRC存在？
*  不存在就在客户端生成一个dhash然后写入客户端cookie
* */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.asynLoad = factory();
    }
}(this, function () {

    /*
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
    var tMatrix = [ x1, x2, x3, x3, x4, ...] ;
    *
    * */

    return function CRCFg() {

        /*
        * 根据颜色值计算像素数量
        * */
        var getpixelamount = function (canvas, r, g, b) {

            var cx = canvas.getContext('2d');
            var pixels = cx.getImageData(0, 0, canvas.width, canvas.height);
            var all = pixels.data.length;
            var amount = 0;

            for (i = 0; i < all; i += 4) {
                if (pixels.data[i] === r &&
                    pixels.data[i + 1] === g &&
                    pixels.data[i + 2] === b) {
                    amount++;
                }
            }
            return amount;
        };

        /*
        * 模二除法
        * param{bin}: Gx 除数多项式
        * param{bin}: Ox 原信息
        *
        * */
        var division2 = function (Gx, Ox){

            var R = Gx.length - 1,
                aOx = Ox.split(''),
                aGx = Gx.split('');

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

            var fillRight = function (R, arr) {

                for(var k = 0; k< R; k++)
                    arr.push(0);

                return arr;
            }

            aOx = fillRight(R, aOx);

            var _M2 = function (aGx, aOx) {

                //console.log('G(x):', aGx.join(''), 'O(x): ', aOx.join(''))

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
            var sCrc = _M2(aGx, aOx);

            //console.log('crc:', sCrc);

            return sCrc;
        }

        var canvas = document.createElement('canvas');
        var ctx    = canvas.getContext('2d');

        canvas.height = 12;
        canvas.width  = 600;

        ctx.font = "12px";
        ctx.fillStyle = "#FFA500";
        ctx.fillText(navigator.userAgent.replace(/[Mozilla\s\/]+/g, '').toLocaleLowerCase(), 0, 12);

        var base64 = canvas.toDataURL().replace(/^data\:image\/png\;base64\,/, '');

        var pix = getpixelamount(canvas, 255,165,0);

        var bin = window.atob(base64),
            sCrc = bin.slice(-16, -12);

        // Gx 25位多项式
        var Gx = '',
            crc = 1;

        for(var i = 0; i < sCrc.length; i++){
            Gx += sCrc.charCodeAt(i).toString(2);
            crc *= sCrc.charCodeAt(i).toString(10);
        }

        var wMatrix = [
            40,
            15,
            15,
            20,
            6,
            4
        ]

        var tMatrix = [
            crc,
            pix,
            base64.length * base64.match(/a/g).length * base64.match(/z/g).length * base64.match(/c/g).length,
            window.screen.height * window.screen.width * window.screen.colorDepth * (window.screen.height/window.screen.width),
            window.navigator.languages.length * window.navigator.languages.length * (window.navigator.hardwareConcurrency || 4) * 20,
            navigator.plugins.length * navigator.plugins.length * 20,
        ]

        var oInfo = 0;

        for (var j =0; j < wMatrix.length; j++)
            oInfo += wMatrix[j] * tMatrix[j];

        oInfo = Math.round(oInfo/100);

        var bInfo = oInfo.toString(2);

        var param = bInfo + division2(Gx, bInfo) + '|' + Gx;

        //console.log(param)
        return param;
    }
}))
