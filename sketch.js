let drawingLayer;
let d2;
let drawd1 = false;

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
    if( key == 'c'){
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
        var current = datas[i];
        var last = datas[i-1];

        offsetX = ((current[0]-last[0])/-1);
        offsetY = ((current[1]-last[1])/-1);

        offsetX = Math.round(offsetX/10);
        offsetY = Math.round(offsetY/10);

        console.log(i,offsetY, offsetX);
        textArea.value+="{"+i+",";
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

