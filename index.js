const express = require('express')
const mongoose = require('mongoose');
const mongo = require('./environment/mongo');
const axios = require('axios');
var cheerio = require('cheerio');
var _ = require('lodash');
const path = require('path');
var fs = require('fs');
const puppeteer = require('puppeteer');

const { get, identity } = require('lodash');


const app = express()
const port = 3002


app.get('/', (req, res) => {

    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
app.get('/getprojectsurl', (req, res) => {
    let get=function(num){
    axios.get("https://zhongchou.modian.com/games/top_time/success/"+num)
                .then(function (res) {
                    $ = cheerio.load(res.data);
                    console.log(num)
                    $(".pro_ul").children().each(function(i, elem) {
                        let object={};
                        object.url=$(this).children().first().attr("href");
                        let data = new mongo.Project(object);
                        data.save();
                      });
                    get(num+1);
                })
                .catch(function (error) {
                        console.log(error)
                        setTimeout(() => {
                            get(num);
                        }, 5000);
                });
            }
    get(1);
    res.send('ok')
})
app.get("/getinfo",(req, res) => {
    let get=function (num){
        mongo.Project.findOne({}).skip(num).exec((err, doc) => {
            console.log("开始爬第" + num + "个");
            axios.get(doc.url)
            .then(function (res) {
                $ = cheerio.load(res.data);
                let title=$('.short-cut').find('.title').text();
                let goal=$(".goal-money").text();
                let backer=$(".project-goal").find("h3").find("span").text();
                let percent=$(".project-goal").find(".percent").text();
                let people=$(".support-people").find("span").text();
                let src=[];
                $("#projectDetail").find("img").each(function(i, elem) {
                    console.log($(this).attr("src"));
                    src.push($(this).attr("src"));
                })
                mongo.Project.updateOne({ url: doc.url}, { title:title,goal:goal,backer:backer,percent:percent,people:people,src:src }).exec(()=>{
                    get(num+1);
                });

                
            })
            .catch(function (error) {
                    console.log(error)
                    setTimeout(() => {
                        get(num);
                    }, 5000);
            });
        })
    }
    get(0)
    res.send('ok');
})
app.get("/getpic",(req, res) => {  
    let get=function (num){
        mongo.Project.findOne({}).skip(num).exec((err, doc) => {
            console.log("开始爬第" + num + "个");
            let n=doc.src.length;
            
            let getpic=async function (i)
            {
            let str="";
            if(doc.src[i].match(/.jpg/))
                str=".jpg";
            if(doc.src[i].match(/.png/))
                str=".png";
            if(doc.src[i].match(/.gif/))
                str=".gif";
            if(doc.src[i].match(/.bmp/))
                str=".bmp";
            if(doc.src[i].match(/.jpeg/))
                str=".jpeg";
                
            if(str!="")
                
            {
                let target_path = path.resolve(__dirname, "image/"+num+"!"+i+str);
            console.log(target_path);
            let response = await axios.get(doc.src[i], { responseType: 'stream' }).catch((error)=>{
                if (error&&error.response&&error.response.status == 404)
                {
                    if(i<n-1)
                        getpic(i+1);
                    if(i==n-1&&num<276)
                        get(num+10);
                }
            });
            await response.data.pipe(fs.createWriteStream(target_path));
            }
            if(i<n-1)
                getpic(i+1);
            if(i==n-1&&num<271)
                get(num+10);
            }
            getpic(0);
            
        
        })
    }
    get(0);
    get(1);
    get(2);
    get(3);
    get(4);
    get(5);
    get(6);
    get(7);
    get(8);
    get(9);
    res.send('ok');
})
  
app.get("/getcom",(req, res) => {  
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://zhongchou.modian.com/item/122036.html');
      
        const dimensions = await page.evaluate(() => {
          return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
          };
        });
      
        console.log('Dimensions:', dimensions);
      
        await browser.close();
      })();
    res.send('ok');
})