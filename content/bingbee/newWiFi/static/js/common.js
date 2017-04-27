//顶部菜单 
$(function(){

//    买单卡券里面的圈圈定位
    $(".pay_card .pay_cardRight >p").css("top",$(".pay_card .pay_cardRight").height()/2-$(".pay_card .pay_cardRight >p").height()/2+"px");
//   买单里面的卡券选择

    $(".pay_cardRight p").click(function(){
        gou_checked()

    });
    gou_checked()
  function gou_checked(){
      $(".pay_cardRight p").each(function(){
          if($(this).find("input").prop("checked")){
              $(this).find(".icon").show();
          }else{

              $(this).find(".icon").hide();
          }
      });
  }

//优惠卡包
    $(".preferential_cardRight .preferential_card_topCopon").css("top",$(".preferential_cardRight").height()/2-$(".preferential_cardRight .preferential_card_topCopon").height()/2+"px");


//    菜单
	$("#top-menu li").click(function(){
		var index = $(this).index();
		$(this).toggleClass('active').siblings().removeClass('active');
		if(!$(this).hasClass('active')){
			$("#top-menu-wrap").css("height","0");
			$(".closeMenu").hide();
			$("#top-menu-wrap .menu-content").hide();
			
			$("#check-mask").hide();
            $(".menu_footer").hide();
            $("#viewport").css("height","auto");
		} else{
			$("#top-menu-wrap").css("height","205px");
			$(".closeMenu").show();
			$("#top-menu-wrap .menu-content").eq(index).css("display","block").siblings().hide();
            $(".menu_footer").show();
            $("#check-mask").show();
			$("#viewport").css("height",($("#top-menu-wrap").height()+150)+"px");
		}
	});
    //历史记录
    /*$(".header-header> input,.map_sousuo").focus(function(){

        if($(this).val().length<=0){
            $(".taoYHS_history").slideDown();
            $(".taoYHS_beInterrelated").hide();
        }else{
            $(".taoYHS_history").hide();
            $(".taoYHS_beInterrelated").slideDown();
        }
        $("#check-mask").show();
    });*/

	$(".header-header> input").focus(function(){
		if($(this).val().length<=0){
            $(".searchHistory").slideDown();
            $(".searchList").hide();
        }else{
            $(".searchHistory").hide();
            $(".searchList").slideDown();
        }
        $("#check-mask").show();
	});
	
	
//    清空历史
    $(".clearSearch").click(function(){

         $(".searchHistory ul").html("");
    });


    //搜索相关显示
    $(".header-header >input").keyup(function(){

       if($(this).val().length<=0){
           $(".taoYHS_history").show();
           $(".searchList").hide();
       }else{
           $(".taoYHS_history").hide();
           $(".searchList").show();
       }
    });
	//点击空白  
	$("#check-mask").click(function(){
		$(this).hide();
		$(".closeMenu").hide();
        $(".menu_footer").hide();
        if($(".searchHistory")){
            $(".searchHistory").slideUp();
        }
        if( $(".searchList")){
            $(".searchList").slideUp();
        }
		$(".addStrokeDiv").hide();
		$("#viewport").css("height","auto");
		$("#top-menu-wrap").css("height","0");
		$("#top-menu-wrap .menu-content").hide();
		$("#top-menu li").removeClass('active');
	});
	$(".closeMenu").click(function(){
		$(this).hide();
		$("#check-mask").hide();
		$("#top-menu-wrap").css("height","0");
		$("#top-menu-wrap .menu-content").hide();
		$("#top-menu li").removeClass('active');
		});
	//顶部二级菜单
	$("#sencondMenu li").click(function(){
		var index = $(this).index(); 
		$(".menu-sub-meu-wrap .sub-menu-content").eq(index).show().siblings().hide();
		$(this).addClass('active').siblings().removeClass('active');
	});
	
	if($(".no_paycard")&& $(".no_paycard").length>0){
	//卡券没得的情况下
	    var winH=$(window).height();
	    var winW=$(window).width();
	    $(".no_paycard").height(winH-($(".no_paycard").offset().top+$(".divLine_2REM").height()+10)+"px");
//	    alert($(".divLine_2REM").height()+10)
	    $(".no_paycard p").css({
	        "marginTop":$(".no_paycard").height()/2+"px",
	        "textAlign":"center"
	    });
	}
});
//回到顶部
$(function() {
	$.fn.manhuatoTop = function(options) {
		var defaults = {			
			showHeight : 150,
			speed : 1000
		};
		var options = $.extend(defaults,options);		
		$("body").prepend("<div id='to-top'><i class='icon iconfont'>&#xe697;</i></div>");
		var $toTop = $(this);
		var $top = $("#to-top");			
		$toTop.scroll(function(){
			var scrolltop = $(this).scrollTop();		
			if(scrolltop >= options.showHeight){
				$top.show();				
			}
			else{
				$top.hide();				
			}			
		});
		$top.click(function(){
			window.scrollTo(0,0);
			//$("html,body").animate({scrollTop: 0},options.speed);			
		});		
	}
	$(window).manhuatoTop({
			showHeight :30,  //设置滚动高度时显示
			speed : 1000    //返回顶部的速度以毫秒为单位
	});	
});

//验证手机号码
function checkNum(){
	var numVal = $("#phoneNum").val();
	//号码输入完成立即验证
	if(numVal.length == 11){
		checkPhoneNum(numVal);
	}
	
	if($('#checkNum').val().length == 4){
		chenkNum($('#checkNum').val());
		}
}

function checkPhoneNum(src){ 
	var yzm = $(".getCheckNum");
	//正则验证手机号
	if(/0?(13|14|15|17|18)[0-9]{9}/.test(src)){
		var b=0;
		var timer=59;
		yzm.css({"background":"#f7b52c "}).click(function(){
				if(b==0){
					var _this=$(this);
					_this.html(timer);
					var tim=setInterval(function(){
						_this.html(timer);
						timer--;
						if(timer<0){
							timer=59;
							clearInterval(tim);
							_this.html("重新获取").css({
								"background":"#f7b52c ",
								"color":"#fff"
							});
						}
					},1000);
					$(this).css({
						"background":"#e9e9e9",
						"color":"#bebebe"
					});
					b=1;
					setTimeout(function(){
						b=0;
					},(1000*timer)+2000)
				}
	
		});
		return true; 
	}else{ 
		alert("请输入正确的手机号码")
		yzm.css({"background":"#e9e9e9"});
		return false; 
	} 
}

function chenkNum(temp){
	if(/^[1-9]\d*|0$/.test(temp)){
		$('.getpagCenter .btn_footer>input[type=button]').removeAttr('disabled').addClass('col_yellow');
		}else{
		alert("请输入数字")
		}
	}
	
	
$(function(){
	//半圆边框
	var getAll_w = $(".WBH-msg").height();
	var getLi_w = $(".WBH-round-border li").width();
	var li_num = Math.ceil(getAll_w / getLi_w);
	var temp = "";
	for (var i = 0; i < li_num-2; i++) {
		temp += "<li></li>";
	}
	$(".WBH-round-border ul").height(li_num * getLi_w + "px");
	$(".WBH-round-border ul").html(temp);
	
	$(".WBH-round-border-right ul").height(li_num * getLi_w + "px");
	$(".WBH-round-border-right ul").html(temp);
});
// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) 
{ //author: meizz 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
    if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}
/**
 * 功能：
 * 1. 启动
 * 2. 停止
 * 3. 重置
 * 4. 获得计时器状态（启动/停止）
 * 
 * 
 * @param selector 选择器，据此操作dom设置计时效果
 * @param content 计时中dom元素展示的文字说明，使用{{second}}标识当前倒计时位置
 * @param second 设置倒计时开始秒数，
 */
function Timer(selector, content, second/*参数可选，默认60*/) {
	var timerInfo = {
		defaultSecond: 60,
		status: false,		// 启动为true，停止为false
		domBaseInfo: $(selector).html() || $(selector).val(),
		domBaseClass: $(selector).attr("class"),
		decrementor: null
	}
	
	var timer = clone();
	timer.second = second || timer.defaultSecond;

	function clone() {
		return Object.create(timerInfo);
	}
	
	// 设置dom元素当前展示内容
	function setContent() {
		var info = content;
		info = info.replace("{{second}}",timer.second);
		$(selector).html(info);
		$(selector).val(info);
		setUseable(false);
	}
	
	function setUseable(flag) {
		if (flag) {
			$(selector).removeAttr("disabled");
		} else {
			$(selector).attr("disabled","disabled");
		}
	}
	function _run() {
		setContent();
		timer.status = true;
		timer.decrementor = setInterval(function() {
			timer.second -= 1;
			setContent();
			if (timer.second <= 0) {
				_stop();
			}
		}, 1000);
	}
	
	function _stop() {
		clearInterval(timer.decrementor);
		backInfo();
		timer.status = false;
		setUseable(true);
	}
	
	function backInfo() {
		$(selector).attr("class", timer.domBaseClass);
		$(selector).html(timer.domBaseInfo);
		$(selector).val(timer.domBaseInfo);
	}
	
	// 对外接口
	this.run = function() {
		_run();
	}
	
	this.stop = function() {
		_stop();
	}
	
	this.reset = function() {
		_stop();
		timer = clone();
	}
	
	this.getStatus = function() {
		return timer.status;
	}
}

function validator(target, pattern) {
	var reg = new RegExp(pattern,"g");
	return reg.test(target);
}

function setUseable(selector,className1,className2,flag) {
	var e = $(selector);
	if (flag) {
		e.addClass(className2);
		e.removeClass(className1);
		e.removeAttr("disabled");
	} else {
		e.addClass(className1);
		e.removeClass(className2);
		e.attr("disabled","disabled");
	}
}

/**
 * 取值范围：	selector包含的元素。
 * 作用：获取含有属性为data-key的元素的值（value值或者html值）
 * 返回：数据对象，key即data-key的值，value即元素的值
 * 
 * 注意：
 * 	1. 在同一个选择器查下面不能有同名的data-key标记，原因是后者会覆盖前者的值
 * 	2. 如果获取的html值，那么此值最好是纯文本（无标签）
 * 	3. 如果选择器下属的元素一个也没有data-key标记，那么返回一个空值对象（即{}）
 * 
 * 依赖：函数依赖于jQuery，逾此，方法功能全盘失效
 * 
 * 作者：cy
 * 日期：2015年10月23日
 * 版本: 1.0.0
 * @param selector	
 */
function valuesDataKey(selector) {
	return valuesAttrName(selector,"data-key");
}

function valuesAttrName(selector, attrName) {
	var o = {};
	function callBack() {
		var key = $(this).attr(attrName);
		var value = $(this).val() || $(this).html();
		o[key] = value;
	}
	objectsAttrName(selector, attrName, callBack);
	return o;
}

function objectsAttrName(selector, attrName, callBack) {
	selector += " *["+attrName+"]";
	$(selector).each(callBack);
}	
$(document).bind("mobileinit", function() {
   //disable ajax nav
   $.mobile.ajaxEnabled=false;
    //$.mobile.autoInitializePage = false;
});