/**
 * Created by wd14931 on 2016/1/25.
 */
/**
 * Created by wd14931 on 2015/11/25.
 *
 */

/*
 2. HTML5新增的API
 A) history.pushState(data, title [, url])：往历史记录堆栈顶部添加一条记录；
 data会在onpopstate事件触发时作为参数传递过去；
 title为页面标题，当前所有浏览器都会忽略此参数；
 url为页面地址，可选，缺省为当前页地址；
 B) history.replaceState(data, title [, url]) ：更改当前的历史记录，参数同上；
 C) history.state：用于存储以上方法的data数据，不同浏览器的读写权限不一样；
 D) window.onpopstate：响应pushState或replaceState的调用；
 */

// 1. data这个参数是不是key值？ replaceState这个方法是依赖于什么去覆盖url的？
// 2. 能不能依靠key值来找对应的url？
// 3. window.onpopstate这个方法在那些情况下调用？

/*
 * 首页，页面的内心如果相同，则切换url的时候几乎看不到切换过程；
 *
 * 在监听这个onpopstate事件之前，对于已经存在于history对象堆栈中的记录的前后切换是不会触发这个
 * 事情的，说明这个事情是需要对对应的某一天记录关联起来的。
 *
 * history.state这个对象只是用来存储pushState于replaceState处理的数据，对于浏览器默认生成的
 * 记录是不会存在里面的。
 *
 * */

/*
 相对于当前的html页面的url替换，如：http://10.1.185.118:808/roby/myRoby.html，执行完之后url
 会变成http://10.1.185.118:808/roby/item
 */

//history.pushState('item1', 'item1Title', 'item1');

/*
 相对于当前的html页面的上一个节点url替换，如：http://10.1.185.118:808/roby/myRoby.html，执行完之后url
 会变成http://10.1.185.118:808/item
 */
//history.pushState('item1', 'item1Title', '/item1');

/*
 相对于当前的html页面的hash，如：http://10.1.185.118:808/roby/myRoby.html，执行完之后url
 会变成http://10.1.185.118:808/roby/myRoby.html#item1
 注：hash值只会有一个，即下面的方法不管运行几次都只会生成一个hash值，如myRoby.html#item1，myRoby.html#item3
 但是，不可能出现myRoby.html#item1#item2
 */
//history.pushState('item1', 'item1Title', '#item1');


/*

 history.state: 这个是指当前我们history.pushState的当前的data，而不是全部的

 */

// 数据驱动
var listen = function(obj, prop, fn){

    return Object.defineProperty(obj, prop, {
        get: function(){
            return this['_'+prop];
        },
        set: function(newValue){

            if(this['_'+prop] !== newValue){
                this['_'+prop] = newValue;

                //that.trigger('change', prop, newValue);
                if(fn && typeof fn === 'function'){
                    fn(this['_'+prop]);
                }
            }
        }
    });
};

var obj = {};

/*
 * 应该是有个open事件是用来打开没有打开过得页面
 * 对于已经打开过的页面我们应该用前进go或者后退去操作
 * 而这个前进或者后退应该是，我们自动的调用，浏览的go
 * 和back即可
 *
 * 用一个私有属性，存储页面，凡是出现过的就不要再用open了。
 * 直接调用back，和go去处理
 *
 * */

function triggerOpen(select, bTrigger){
    $('.item:visible').hide();

    if(!bTrigger){
        history.pushState(select, select+'Title', '#'+select);
    }

    setTimeout(function(){
        $('.'+select).show();
    }, 150);
}

listen(obj, 'event', function(i){
    var select = 'item'+i;

    triggerOpen(select);
});

// 属性的赋值必须在listen之后，否则这个属性就是NaN的对应Listen中
obj.event = 0;

$('.J-prev').on('click', function(){
    // index()如果不加参数的话，是按自己的兄弟节点来计算的，很不准确，要加个一个数据才准确
    //var index = $('.item:visible').index($('.item')) - 1;

    if(obj.event <= 0){
        return;
    }
    var val = obj.event;

    obj.event = val - 1;
});

$('.J-next').on('click', function(){

    if(obj.event >= 3){
        return;
    }

    var val = obj.event;

    obj.event = val + 1;


});

window.addEventListener('onpopstate', function(e){
    ee = e;
    console.log(e);
}, false);
window.onpopstate = function(e){
    ee = e;
    ee.state;// key
    console.log(e);
    // true：执行后退的时候不要去存储
    triggerOpen(ee.state, true);
};


/*
 * page组件
 * 默认是将选择器做为data即hash
 *
 * */

function GnyPage(){

    var that = this;
    var self = arguments.callee;
    // 私有属性，首先，把当前页面存进去
    var _historyList = ['current'];

    that.set= function(arg){
        _historyList.push(arg);
    };

    that.get = function(){
        console.log(_historyList);
        return _historyList;
    };

    var _go = function(){
        window.history.go();
    };
    var _back = function(){
        window.history.back();
    };

    // 首先，要调用一次open方法把当前页面存进去

    // 选择器, cfg = {class: '', id: '', fn: function}
    self.open = function(cfg){

        if(cfg.class){
            var sSelect = cfg.class;
        }else if(cfg.id){
            var sSelect = cfg.id;
        }else{
            console.error('Invalid element!!');
        }

        that.fn = cfg.fn || null;

        // 首先判断临时缓存中有没有该页面的历史
        var aTemp = that.get();

    };


    self.close = function(){

    }


}


