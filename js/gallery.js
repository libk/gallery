/**
 * @author libk
 * @version v1.0
 * @fileOverview 简单的相册展示
 */
window.onload=function ()
{
	var oGallery=document.getElementsByClassName("gallery")[0];
	var oMaskLeft=document.getElementsByClassName("mask-left")[0];
	var oMaskRight=document.getElementsByClassName("mask-right")[0];
	var oArrowLeft=document.getElementsByClassName("arrow-left")[0];
	var oArrowRight=document.getElementsByClassName("arrow-right")[0];

	var oPicBig=document.getElementsByClassName("pic-big")[0];
	var oPicList=oPicBig.getElementsByTagName("li");

	var oPicSmall=document.getElementsByClassName("pic-small")[0];
	var oPicSmalUl=oPicSmall.getElementsByTagName("ul")[0];
	oPicSmalUl.innerHTML=oPicSmalUl.innerHTML+oPicSmalUl.innerHTML;
	var oPicSmallList=oPicSmalUl.getElementsByTagName("li");

	var nowPic=0;
	var prePic=-1;

	for(var i=1;i<oPicSmallList.length;i++)
	{
		startMove(oPicSmallList[i],{opacity: 50},5,null);
	}

	for(var j=0;j<oPicSmallList.length;j++)
	{
		oPicSmallList[j].index=j;
		makeHandler(oPicSmallList[j],"click",j);
	}

	function makeHandler(obj,eventName,k)
	{
		addEventHandler(oPicSmallList[k],"click",function (){
		displayPic(oPicSmalUl,oPicSmallList[k]);
		});
	}
	var autoTimer=null;
	autoTimer=setInterval(function (){
		displayPic(oArrowRight,oPicSmalUl);
		}, 1500);
	addEventHandler(oGallery,"mouseout",function (){
		autoTimer=setInterval(function (){
		displayPic(oArrowRight,oPicSmalUl);
		}, 1500);
	});
	addEventHandler(oGallery,"mouseover",function (){
		clearInterval(autoTimer);
	});

	addEventHandler(oMaskLeft,"mouseover",function (){
		displayArrow(oMaskLeft,"mouseover");
	});
	addEventHandler(oMaskRight,"mouseover",function (){
		displayArrow(oMaskRight,"mouseover");
	});
	addEventHandler(oMaskLeft,"mouseout",function (){
		displayArrow(oMaskLeft,"mouseout");
	});
	addEventHandler(oMaskRight,"mouseout",function (){
		displayArrow(oMaskRight,"mouseout");
	});
	addEventHandler(oArrowLeft,"mouseover",function (){
		displayArrow(oMaskLeft,"mouseover");
	});
	addEventHandler(oArrowRight,"mouseover",function (){
		displayArrow(oMaskRight,"mouseover");
	});
	addEventHandler(oArrowLeft,"mouseout",function (){
		displayArrow(oMaskLeft,"mouseout");
	});
	addEventHandler(oArrowRight,"mouseout",function (){
		displayArrow(oMaskRight,"mouseout");
	});

	addEventHandler(oArrowLeft,"click",function (){
		displayPic(oArrowLeft,oPicSmalUl);
	});
	addEventHandler(oArrowRight,"click",function (){
		displayPic(oArrowRight,oPicSmalUl);
	});

	/**
	 * 添加事件处理函数
	 * @param {[type]} obj       [要添加事件的对象]
	 * @param {[type]} eventName [事件名字]
	 * @param {[type]} handler   [处理函数]
	 */
	function addEventHandler(obj,eventName,handler)
	{
		if(document.attachEvent)
		{
			obj.attachEvent("on"+eventName,handler);
		}
		else if(document.addEventListener)
		{
			obj.addEventListener(eventName,handler);
		}
		else
		{
			obj["on"+eventName] = handler;
		}
	}
	function removeEventHandler(obj,eventName,handler)
	{
	    if (document.detachEvent)
	    {
	        obj.detachEvent('on'+eventName,handler);
	    }
	    else if (document.removeEventListener)
	    {
	        obj.removeEventListener(eventName,handler,false);
	    }
	    else
	    {
	    	obj["on"+eventName] = null;
	    }
	}

	/**
	 * [getStyle 来获取对象的样式]
	 * @param  {object} obj  [要获取哪个对象的属性]
	 * @param  {string} name [要获取的属性的名称]
	 * @return {string}      [返回要获取的属性值]
	 */
	function getStyle(obj, name)
	{
		if(obj.currentStyle)
		{
			return obj.currentStyle[name];
		}
		else
		{
			return getComputedStyle(obj, false)[name];
		}
	}

	/**
	 * 控制左右方向箭头的显示
	 * @param  {[type]} obj [description]
	 * @param  {[type]} evt [description]
	 * @return {[type]}     [description]
	 */
	function displayArrow(obj,evt)
	{
		if(evt==="mouseover")
		{
			if(obj===oMaskLeft)
			{
				oArrowLeft.style.zIndex=5;
			}
			else if(obj===oMaskRight)
			{
				oArrowRight.style.zIndex=5;
			}
		}
		else if(evt==="mouseout")
		{
			if(obj===oMaskLeft)
			{
				oArrowLeft.style.zIndex=1;
			}
			else if(obj===oMaskRight)
			{
				oArrowRight.style.zIndex=1;
			}
		}
	}

	/**
	 * 控制大图片的显示
	 * @param  {[type]} objOne [description]
	 * @param  {[type]} objTwo [description]
	 * @return {[type]}        [description]
	 */
	function displayPic(objOne,objTwo)
	{
		if(objOne===oArrowLeft)
		{
			if(prePic!==-1)
			{
				oPicList[prePic].style.zIndex=1;
				oPicList[nowPic].style.zIndex=2;
			}

			if(nowPic===0)
			{
				startMove(objTwo,{left:-1000},1,null);
			}
			else
			{
				startMove(objTwo,{left:(6-nowPic)*200-1000},5,null);
			}
			prePic=nowPic;
			nowPic--;
			if(nowPic===-1)
			{
				nowPic=oPicList.length-1;
			}
			oPicList[nowPic].style.height=0;
			oPicList[nowPic].style.zIndex=3;
			startMove(oPicSmallList[prePic],{opacity: 50},5,null);
			startMove(oPicSmallList[nowPic],{opacity: 100},5,null);
			startMove(oPicList[nowPic],{height: 500},5,null);
		}
		else if(objOne===oArrowRight)
		{
			if(prePic!==-1)
			{
				oPicList[prePic].style.zIndex=1;
				oPicList[nowPic].style.zIndex=2;
			}
			if(nowPic===oPicList.length-1)
			{
				startMove(objTwo,{left:0},1,null);
			}
			else
			{
				startMove(objTwo,{left:-(nowPic+1)*200},5,null);
			}
			prePic=nowPic;
			nowPic++;
			if(nowPic===oPicList.length)
			{
				nowPic=0;
			}
			oPicList[nowPic].style.height=0;
			oPicList[nowPic].style.zIndex=3;
			startMove(oPicSmallList[prePic],{opacity: 50},5,null);
			startMove(oPicSmallList[nowPic],{opacity: 100},5,null);
			startMove(oPicList[nowPic],{height: 500},5,null);
		}
		else if(objOne===oPicSmalUl)
		{
			if(prePic!==-1)
			{
				oPicList[prePic].style.zIndex=1;
				oPicList[nowPic].style.zIndex=2;
			}
			prePic=nowPic;
			nowPic=objTwo.index;
			if(nowPic>=6)
			{
				nowPic-=6;
				startMove(objOne,{left:-(nowPic)*200},1,null);
			}
			else
			{
				startMove(objOne,{left:-(nowPic)*200},5,null);
			}

			oPicList[nowPic].style.height=0;
			oPicList[nowPic].style.zIndex=3;
			startMove(oPicSmallList[prePic],{opacity: 50},5,null);
			startMove(oPicSmallList[nowPic],{opacity: 100},5,null);
			startMove(oPicList[nowPic],{height: 500},5,null);
		}
	}

};