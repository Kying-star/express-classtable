/*
 * @Author: your name
 * @Date: 2021-03-29 22:08:52
 * @LastEditTime: 2021-03-30 16:39:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /kebiao/routes/users.js
 */
var express = require('express');
var router = express.Router();
var superagent = require('superagent');
let request = require("request")
var cheerio = require('cheerio');
const url = "http://jwzx.cqupt.edu.cn/kebiao/kb_stu.php?xh=2019210435"

/* GET users listing. */
router.get('/', (req, res, next) => {
  request(url, function (error, response, body) {
    //console.log(response);
    if (!error && response.statusCode == 200) {
      //返回的body为抓到的网页的html内容
      var $ = cheerio.load(body); //当前的$符相当于拿到了所有的body里面的选择器
      //var navText = $('.super normal button'); //拿到导航栏的内容
      //console.log(navText);
      let inner = $(".printTable")
      //console.log(inner);
      let data = inner.html()
      let str = data
      .replace(/<[^<>]+>/g,"+")
      .split("+")
      .filter(e=>e != '')
      let week = str.filter(e=>{
        return e.match(/第\d*周/)
      }).filter(e=>{
        return !e.match(/\t/)
      })
      let day = str.filter(e=>{
        return e.match(/星期\w*/)
      })
      let classRange = str.filter(e=>{
        return e.match(/\w*节/)
      })
      res.send(str);
      //res.send(body)
    }
  })
});
module.exports = router;
