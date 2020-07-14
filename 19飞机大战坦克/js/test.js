//1.让背景动起来
var bj1 = document.getElementById("bg1");
var bj2 = document.getElementById("bg2");
var main=document.getElementById("mainScreen");
var tanke = document.getElementById('tanke');
var paly = document.getElementById('start');
var fenshu = 0;



//开始键
paly.onclick = function(){
	
 paly.style.display = "none";

//主频木动起来
 var id = setInterval(function(){
	bj1.style.top = bj1.offsetTop  + 1 +'px';
	bj2.style.top = bj2.offsetTop  + 1 +'px';
	if(bj1.offsetTop>=768){
		bj1.style.top = "-768px";
		
	}
	if(bj2.offsetTop>=768){
		bj2.style.top = "-768px";
		}
},0.1)

//坦克动起来
tanke.onmousedown = function(e){ //鼠标按下事件
	var ev = e||window.event;
	basex = ev.pageX;
	basey = ev.pageY;   //base 点击的数值
	
	
	movex =0;
	movey = 0;
	
	//给主频幕 加鼠标移动事件
	
	main.onmousemove = function(e){
		
		
		var en = e||window.event;
		movex = en.pageX-basex;
		basex = en.pageX;
		movey = en.pageY - basey;
		basey = en.pageY;
		tanke.style.left=tanke.offsetLeft + movex + 'px';
		tanke.style.top = tanke.offsetTop + movey +'px';
		
	}
	
}

//子弹
var zidanID = setInterval(function(){
	var bullent = document.createElement("div");
	main.appendChild(bullent);
	bullent.className = "zidan";
	bullent.style.left =tanke.offsetLeft + 40 +"px";
	bullent.style.top = tanke.offsetTop+ -20 +"px";
	
	
//子弹飞	
	var feiID = setInterval(function(){
		bullent.style.top = bullent.offsetTop -10 +"px";//让子弹向上移动5px
		
		if(bullent.offsetTop<= -20){
			clearInterval(feiID);
			main.removeChild(bullent);
		}
	},90) 
	bullent.timer = feiID;
},1000)

//大强

//随机
function randomNUM(min,max){
	return parseInt(Math.random()*(max-min)+min);
}


var daqiangID = setInterval(function(){
	var daqiang = document.createElement("div");
		main.appendChild(daqiang);
		daqiang.className = "daqiang";
		daqiang.style.left =randomNUM(0,432) + "px";
		daqiang.style.top = 0 + "px";
	
	
//大强飞	
	var feiID2 = setInterval(function(){
		daqiang.style.top = daqiang.offsetTop +10 +"px";
	
		if(daqiang.offsetTop>=768){
			clearInterval(feiID2);
			main.removeChild(daqiang);
		
		}
	},100) 
	daqiang.timer = feiID2;
},1000)




 var pingzhuangID = setInterval(function(){
	 var  allzidan = document.getElementsByClassName("zidan");
	 var  alldaqiang = document.getElementsByClassName("daqiang");
	 var defen = document.getElementById('defen');
	 for( var i= 0; i<allzidan.length;i++){
	 	for(var j= 0; j<alldaqiang.length;j++){
				
	 		var b= allzidan[i];
	 		var d = alldaqiang[j];
			if(pengzhuang(b,d)){
					
					fenshu++;
					defen.innerText = "得分："+ fenshu;
				
				
				clearInterval(b.timer);
				clearInterval(d.timer);
				main.removeChild(b);
				main.removeChild(d);
				break;  //没有这个  没办法循环
			}
	 	}
	 }
 },200) 
//碰撞检测
function pengzhuang(block1,block2){
				var left1 = parseInt(window.getComputedStyle(block1).left);
				var left2 = parseInt(window.getComputedStyle(block2).left);
				
				var top1 = parseInt(window.getComputedStyle(block1).top);
				var top2 = parseInt(window.getComputedStyle(block2).top);
				
				var width1 = parseInt(window.getComputedStyle(block1).width);
				var width2 = parseInt(window.getComputedStyle(block2).width);
				
				var height1 = parseInt(window.getComputedStyle(block1).height);
				var height2 = parseInt(window.getComputedStyle(block2).height);
				var center1 = {
					x: left1 + width1 / 2,
					y: top1 + height1 / 2
				}
				var center2 = {
					x: left2 + width2 / 2,
					y: top2 + height2 / 2
				}
				var diffx = Math.abs(center1.x - center2.x);
				var diffy = Math.abs(center1.y - center2.y);
				if(diffx < (width1 + width2)/2 && diffy < (height1+height2)/2){
					return true;
				}else{
					return false;
				}
			}
			
			
//gameover
 var gameoverID = setInterval(function(){
	 var  alldaqiang = document.getElementsByClassName("daqiang");
	var  gameover = document.getElementById('gameover');
	 	for(var j= 0; j<alldaqiang.length;j++){
			var b = tanke;
	 		var d = alldaqiang[j];
			if(pengzhuang(b,d)){
				
				
				//暴力全停
				for(var i=0;i<100;i++){
					clearInterval(i);	
				}	
				
				
				b.style.display = "none";
				main.removeChild(d);
				gameover.style.display = "block";
				d.style.display = "none";
				main.style.display = "none";
				
			}
	 	}
	 
 },200) 
 }
 //得分
