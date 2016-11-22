/**
 * @author libk
 * @version v1.0
 * @fileOverview JavaScript通用的运动框架，可以控制单个元素的多个运动同时进行，并且支持链式运动
 */

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
 * [startMove 设置运动的定时器]
 * @param  {[type]} obj   [要运动的对象]
 * @param  {[type]} json  [控制对象运动方式的json]
 * @param  {[type]} fnNext [本次运动结束后，接着要做的运动]
 * @return {[type]}       [none]
 */
function startMove(obj, json, stepSpeed,fnNext)
{
	/*
	为了防止运动过程中对运动的重复出发，所以每次触发运动，都要清除已有的定时器
	 */
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		oneStep(obj,json,stepSpeed,fnNext);
	}, 30);
}

/**
 * [控制定时器中每次的移动]
 * @param  {[type]} obj   [要运动的对象]
 * @param  {[type]} json  [控制对象运动方式的json]
 * @param  {[type]} fnNext [本次运动结束后，接着要做的运动]
 * @return {[type]}       [none]
 */
function oneStep(obj, json, stepSpeed, fnNext)
{
	/*
	bStop=true表示所有属性已经到达目标点
	bStop的作用是当元素同时存在多个运动的时候，保证所有运动都结束，才清楚定时器
	 */
	var bStop=true;
		for(var attr in json)
		{
			/*
			控制运动的属性的当前值
			 */
			var cur=0;

			if(attr=='opacity')
			{
				/*
				opacity用浮点数来存储，浏览器内部的浮点数运算存在误差，当乘以100后，这种误差会被放大，所以用round来四舍五入
				 */
				cur=Math.round(parseFloat(getStyle(obj, attr))*100);
			}
			else
			{
				cur=parseInt(getStyle(obj, attr));
			}

			/*
			计算运动的速度
			对于px来说，是显示器的最小单位，用ceil和floor将speed取整
			 */
			var speed=(json[attr]-cur)/stepSpeed;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);

			if(cur!=json[attr])
				bStop=false;

			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}
			else
			{
				obj.style[attr]=cur+speed+'px';
			}
		}

		if(bStop)
		{
			clearInterval(obj.timer);

			if(fnNext)fnNext();
		}
}