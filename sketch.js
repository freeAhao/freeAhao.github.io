let drawingLayer;
let d2;
let drawd1 = false;
var begin=1;
var ignoreX=false;
var ignoreY=false;
var fa=10;
var dot=false;

function changeDot(){
  dot = document.getElementById('ignoreDot').checked;
  caldata();
}

function changeFa(){
  fa = Number(document.getElementById('fa').value);
  document.getElementById('fashow').innerHTML=fa;
  caldata();
}

function changeIgnore(xy){
  if(xy=='x'){
    ignoreX=document.getElementById('ignoreX').checked;
  }else if(xy=='y'){
    ignoreY=document.getElementById('ignoreY').checked;
  }
  caldata();
}
function changeBegin(){
  begin = Number(document.getElementById("beginIndex").value);
  if (begin<=0){
    begin = 1;
    document.getElementById("beginIndex").value=1;
  }
  caldata();
}

function updateimage(){
  var img = document.getElementById("img");
  var file = img.files[0];
  var url = null
  if (window.createObjectURL != undefined) { // basic    
    url = window.createObjectURL(file)
  } else if (window.URL != undefined) { // mozilla(firefox)    
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL != undefined) { // webkit or chrome    
    url = window.webkitURL.createObjectURL(file)
  }
  loadImage(url,drawImg)
}

function keyReleased(){
  if( key == 'q'){
    d2.clear();

    datas=[];
    caldata();
  }
  return false;
}

function setup(){
  var width=1920;
  var height=1080;
  var mcanvas = createCanvas(width,height);
  drawingLayer = createGraphics(width, height);
  d2 = createGraphics(width, height);
  mcanvas.parent("container");
  //loadImage("http://img0.pclady.com.cn/pclady/1505/15/1303475_292.jpg", drawCat);
  //loadImage("/r.png", drawCat);
  mcanvas.mouseReleased(mmouseReleased);
}

var datas=[];

function caldata(){
  var textArea = document.getElementById("result");
  textArea.value="";
  for(var i=1;i<datas.length;i++){
    var number = i+begin-1;
    var current = datas[i];
    var last = datas[i-1];

    if(ignoreX){
      offsetX=0;
    }else{
      offsetX = ((current[0]-last[0])/-1);
      offsetX = offsetX/fa;
      if(dot){
        offsetX=Math.round(offsetX);
      }
    }

    if(ignoreY){
      offsetY=0;
    }else{
      offsetY = ((current[1]-last[1])/-1);
      offsetY = offsetY/fa;
      if(dot){
        offsetY=Math.round(offsetY);
      }
    }


    console.log(number,offsetY, offsetX);
    textArea.value+="{"+number+",";
    textArea.value+=offsetY+",";
    textArea.value+=offsetX+",";
    textArea.value+="}"+",";
    textArea.value+="\n";
  }
}

function datapush(x, y){
  var flag = false;
  datas.forEach(function (i){
    if(i[0]==x&&i[1]==y){
      flag=true;
    }
  })

  if (!flag){
    datas.push([x,y]);
    //console.log(datas);
    caldata();
  }
}

function mmouseReleased(event){
  drawingLayer.noStroke();
  drawingLayer.ellipse(mouseX, mouseY, 20);
  d2.noStroke();
  d2.stroke(255, 0, 0);
  d2.ellipse(mouseX, mouseY, 10, 10);
  datapush(mouseX,mouseY);
}

function draw(){
  background(220);

  if (drawd1) {
    image(drawingLayer, 0, 0);
  } else if (!drawd1) {
    image(d2, 0, 0);
  }

  noFill();
  ellipse(mouseX, mouseY, 20);
}

function drawImg(img){
  d2.image(img, 0, 0);
}

