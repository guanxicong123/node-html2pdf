const express = require("express")
const app = express()
app.use(express.static("www"))
app.listen(3000,()=>{
    console.log("服务开启在3000端口")
    getExcel()
})

function getExcel(){
  // 引入 node-xlsx 模块
  const xlsx = require('node-xlsx')
  var fs = require('fs'); //文件模块
  var path = require('path'); //系统路径模块
  // excel文件类径
  const excelFilePath = './e.xlsx'
  const data = []
  //解析excel, 获取到所有sheets
  const sheets = xlsx.parse(excelFilePath);

  // 查看页面数
  console.log(sheets.length);

  // 打印页面信息..
  const sheet = sheets[0];
  console.log(sheet);

  // 打印页面数据
  console.log(sheet.data);
  // createPDF2()
  // createPDF4()
  // 输出每行内容
  sheet.data.forEach(row => {
      console.log(row);
      data.push(row)
      // createPDF()
      // createPDF3()
      
      // 数组格式, 根据不同的索引取数据
  })
  var content = JSON.stringify(data); 
  var file = path.join(__dirname, '../excelVue/excel2pdf/excel.json');
  fs.writeFile(file, content, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log('文件创建成功，地址：' + file);
});
}

function createPDF() {
  var fs = require('fs');
  var pdf = require('html-pdf');// 这种则是依靠自己本事转pdf的，这种方式样式兼容不太好，渲染结果是黑白的
  var html = fs.readFileSync('pdf2.html', 'utf8');
  var options = { format: 'Letter' };// api请查看npm，因为一直再更新，请根据官方为主。

  setTimeout(()=>{
    pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });
  },10000)

}
// import puppeteer from 'puppeteer';
function createPDF2(){
  const puppeteer = require('puppeteer');

  // (async () => {
  //   const browser = await puppeteer.launch({headless: false});
  //   const page = await browser.newPage();
  //   await page.goto('./pdf2.html', { //这个可以渲染出图片甚至跨域的图片
  //     waitUntil: 'networkidle2',
  //   });
  //   await page.pdf({ path: 'hn1.pdf', format: 'a4' }); // 如果已有该文件会报错 

  //   await browser.close();
  // })();


(async () => {
  // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://blog.risingstack.com', {waitUntil: 'networkidle0'});
    const pdf = await page.pdf({ path: 'hn1.pdf',format: 'A4' });
   
    await browser.close();
    return pdf
  }
)();
}
function createPDF3(){
  const phantom = require('phantom');
  phantom.create().then(function(ph) {
      ph.createPage().then(function(page) {
          page.open("./pdf2.html").then(function(status) {
              page.property('viewportSize',{width: 10000, height: 500});
              page.render('./oracle10000.pdf').then(function(){
                  console.log('Page rendered');
                  ph.exit();
              });
          });
      });
  });

}
function createPDF4() {
  const PDFDocument = require('pdfkit');
  const fs = require('fs');

  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream('output.pdf'));

  doc.html('<h1>Hello World</h1>', 100, 100);
  doc.end();
}
