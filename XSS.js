/**
 * Created by wd14931 on 2017/5/4.
 */
/*
* xss 跨站攻击
* 解决办法，很多前端渲染模板也会自动防xss的转译功能
*
* 转译就是将 能形成HTML标签的字符全部转化为安全字符，这些字符主要有
* & < > " ' 这几个
* */
var escape = function(html){

    return String(html)
        .replace(/&(?!\W+;)/g, '&amp;')//&amp;是&在html中的转义字符, &是为了转化&lt;和&gt;中的&；
        .replace(/</g, '&lt;') // 同理
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#o39;');
}

//字符	 十进制	转义字符
//"	 &#34;	&quot;
//&	 &#38;	&amp;
//<	 &#60;	&lt;
//>	 &#62;	&gt;
//不断开空格(non-breaking space)	&#160;	&nbsp;