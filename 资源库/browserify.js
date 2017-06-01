/*
* grunt-browserify
* https://github.com/jmreidy/grunt-browserify
*
* Copyright (c) 2013 Justin Reidy
* Licensed under the MIT license.
*/
var Runner = require('../lib/runner');
var path = require('path');
var async = require('async');
var browserify = require('browserify');
var watchify = require('watchify');

module.exports = Task;

function Task (grunt) {
  grunt.registerMultiTask('browserify', 'Grunt task for browserify.', function () {

    // set default options
    var options = this.options({
      banner: ''
    });

    async.each(this.files, function (file, next) {
      Task.runTask(grunt, options, file, next);
    }, this.async());
  });
}

Task.runTask = function (grunt, options, file, next) {
  var runner = new Runner({
    writer: grunt.file,
    logger: grunt,
    browserify: browserify,
    watchify: watchify
  });
  var files = grunt.file.expand({filter: 'isFile'}, file.src).map(function (f) {
    return path.resolve(f);
  });

  /*
     files: src对应的入口文件，可能是字符串，也可能是数组
   * 此处将dest,与入口文件进行拆分，让他们生成对应的文件
   *
   * 1，默认的dest对应的生成文件应该是一个字符串才对，但是我们进行了改写，
   * 如果是字符串的时候我们不做任何处理，否则如果是数组的时候进行遍历，
   * 而且遍历的时候是从src的前面去匹配，直到dest这个数组匹配完为止，
   * 默认是一比一匹配，最后的如果是多个的话那就多个对应一个dest的文件即可
   *
   * 2，同时如果dest的数组的时候alias中的文件只在第一个里面生成一次即可
   *
   * 扩展：如果dest指定的是一个文件夹，则在这个文件夹下面生成，对应的即可，否则就
   * 按我们上面的操作。
   *
   * */

  if(typeof file.dest === 'string'){

    var sDest = file.dest;

    // 是一个js文件，否则，是一个文件夹
    if(/\w+.js$/g.test(sDest)){

      runner.run(files, file.dest, options, next);
    }else{

      var aSrc = file.src;

      aSrc.forEach(function (f, i) {

        // 判断require是否存在, 只在首个文件引入即可
        if(options.alias && i > 0){
          delete options.alias;
        }

        // 路径匹配
        var aDest = sDest.split('/'),
            aSrc = f.split('/');

        for(var j=0; aDest[j]; j++){

          if(aSrc[j] === aDest[j])
            continue;
          else{

            // 文件，否则，是文件
            if(/\w+.js$/g.test(aSrc[j])){

              aSrc.splice(j, 0, aDest[j]);
              console.warn('Warn:Hava same level files, generate the sub files!');
            }
            else
              aSrc.splice(j, 1, aDest[j]);
          }
        }

        // 生成对应的目标文件
        runner.run(files[i], aSrc.join('/'), options, function(){});
      });
    }
  }else if(typeof (file.dest) ==='object'
      && Object.prototype.toString.call(file.dest).substring(8) === 'Array]'){

    /*
     开始匹配
     * 1, 如果src与dest数组长度相等时
     * 2， 如果src大于dest的长度的时候，则多于的都生成到最后一个dest的文件中
     * */
    var iDest = file.dest.length,
        iSrc = file.src.length;

    if(iDest === iSrc){
      file.dest.forEach(function (f, i) {

        // 判断require是否存在, 只在首个文件引入即可
        if(options.alias && i > 0){
              delete options.alias;
        }

        // dest与src文件1:1的对应生成依赖
        runner.run(files[i], f, options, function(){});
      });
    }else{
      file.dest.forEach(function (f, i) {

        // 判断alias是否存在, 只在首个文件引入即可
        if(options.alias && i > 0){
          delete options.alias;
        }

        if(i < iDest - 1){

          // 从入口文件的前面开始取
          runner.run(files[i], f, options, function(){});
        }else{

          // 最后的文件一次性打包
          files.splice(0,i);
          runner.run(files, f, options, function(){});
        }
      });
    }

  }
  // files: 入口文件的绝对路径
  //runner.run(files, file.dest, options, next);wd
};
