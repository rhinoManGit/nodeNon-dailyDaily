/*��node��,����ʹ��require()����������ģ��.
 * require����ʹ��һ������,����ֵ���Դ�������·����ģ����ļ���,Ҳ����Ϊģ����.��ʹ��node���ṩ��ģ��ʱ,��require������ֻ��Ҫָ��ģ��������.
 * */
//����һ��ҳ��2.js;��������
var name="˼˼��ʿ";
exports.name=name;
//����һ��ҳ��1.js;��������
var two=require("./2.js");
console.log(two.name);
//������:˼˼��ʿ
/*
 * ��node�����еĽű��ļ�����һ��ģ���ļ�,���1.jsҲ��һ��ģ���ļ�,�����ڸ��ļ����������д�����ͨ��node���ֱ�����е�,�����node�и�ģ���ļ�������ΪӦ�ó������ģ��
 * ���������µķ���������ǰ��ģ���Ƿ�����ģ��
 * */
if(module===require.main){
    console.log("��ǰģ��ʱ��ģ��");
}
//������:��ǰģ��ʱ��ģ��
//2.js����
var name="˼˼��ʿ";
console.log(name);
exports.name=name;
//1.js����:
var two=require("./2.js");
var two=require("./2.js");
//��Ȼ������2��,����ֻ��ִ����1��console.log(name)�����.
/*require.resolve(str)
 * ��node��,����ʹ�������������ѯĳ��ģ���ļ��Ĵ�����������·�����ļ���.
 * */
var url=require.resolve("./2");
console.log(url);
//������:E:\node\gys\2.js
/*require.cache
 * ��node��,������Դ����������ѱ�����ģ��Ļ�����.
 * */
var two=require("./2.js");
var cache=require.cache;
console.log(cache);
/*������:
 * { 'E:\\node\\gys\\1.js':
 { id: '.',
 exports: {},
 parent: null,
 filename: 'E:\\node\\gys\\1.js',
 loaded: false,
 children: [ [Object] ],
 paths:
 [ 'E:\\node\\gys\\node_modules',
 'E:\\node\\node_modules',
 'E:\\node_modules' ] },
 'E:\\node\\gys\\2.js':
 { id: 'E:\\node\\gys\\2.js',
 exports: { name: '˼˼��ʿ' },
 parent:
 { id: '.',
 exports: {},
 parent: null,
 filename: 'E:\\node\\gys\\1.js',
 loaded: false,
 children: [Object],
 paths: [Object] },
 filename: 'E:\\node\\gys\\2.js',
 loaded: true,
 children: [],
 paths:
 [ 'E:\\node\\gys\\node_modules',
 'E:\\node\\node_modules',
 'E:\\node_modules' ] } }
 * */
//2.js����
var name="˼˼��ʿ";
console.log(name);
//1.js����
//��ʹ��delete�ؼ���ɾ���������л����ĳ��ģ������,�´μ��ظ�ģ��ʱ���������и�ģ���еĴ���.ʹ�ô���:
var two=require("./2.js");
var two1=require("./2.js");
console.log("ɾ��ǰ")
delete require.cache[require.resolve("./2.js")];
console.log("ɾ����");
var two2=require("./2.js");
/*
 * ������:
 * ˼˼��ʿ
 * ɾ��ǰ
 * ɾ����
 * ˼˼��ʿ
 * */