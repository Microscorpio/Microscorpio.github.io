/*
 * @弹出提示层 ( 加载动画(load), 提示动画(tip), 成功(success), 错误(error), )
 * @method  tipBox
 * @description 默认配置参数 
 * @time    2015-08-27
 * @param {Number} width -宽度
 * @param {Number} height -高度		
 * @param {String} str -默认文字
 * @param {Object} windowDom -载入窗口 默认当前窗口
 * @param {Number} setTime -定时消失(毫秒) 默认为0 不消失
 * @param {Boolean} hasMask -是否显示遮罩
 * @param {Boolean} hasMaskWhite -显示白色遮罩 
 * @param {Boolean} clickDomCancel -点击空白取消
 * @param {Function} callBack -回调函数 (只在开启定时消失时才生效)
 * @param {String} type -动画类型 (加载,成功,失败,提示)confirmid
 * @param {String} confirmid -确认Id用于isSub确认框重写clickOk(confirmid)
 * @example 
 * new TipBox(); 
 * new TipBox({type:'load',setTime:1000,callBack:function(){ alert(..) }}); 
*/
function TipBox(cfg){
	this.config = { 
		width          :350,
		height         :240,
		str            : '正在处理',     
		windowDom      : window, 
		setTime        : 0,   
		hasMask        : true,  
		hasMaskWhite   : false, 
		clickDomCancel : false,  
		callBack       : null,
		type           : 'success',
		sureHandler    : null,
		closeHandler   : null,
		color:"#66cc33",
		small_str:"请输入正确的<span>‘领取号码’</span>",
		btn:"short"
	}
	$.extend(this.config,cfg);	
	
	//存在就retrun
	if(this.boundingBox) return;
	
	this.boundingBox = null;
	//初始化
	this.render(this.config.type);	
	return this; 
};

//渲染
TipBox.prototype.render = function(tipType,container){	
	this.renderUI(tipType); 
	
	//绑定事件
	this.bindUI(); 
	
	//初始化UI
	this.syncUI(); 
	$(container || this.config.windowDom.document.body).append(this.boundingBox);	
};

//渲染UI
TipBox.prototype.renderUI = function(tipType){ 
	this.boundingBox = $("<div id='animationTipBox'></div>");  		
	tipType == 'load'    && this.loadRenderUI();
	tipType == 'success' && this.successRenderUI();	
	tipType == 'error'   && this.errorRenderUI();
	tipType == 'tip'     && this.tipRenderUI();
	tipType == 'con'     && this.confirmRenderUI();
	tipType == 'check'   && this.checkRenderUI();//输入验证码
	tipType == 'give'    && this.giveRenderUI();//输入手机号码,赠送
	tipType == 'getpag'  && this.getpagRenderUI();//输入手机号码领取红包
	tipType == 'smail'   && this.smailRenderUI();//笑脸弹框
	tipType == 'newUser' && this.newUserRenderUI();//游客验证登录
	tipType == 'isSub'   && this.newIsSubRenderUI();//是否执行操作
	tipType == 'Coupons'   && this.giveCoupons();//查看优惠券
	tipType == 'redBao'   &&this.giveRedBao();//分享红包
	this.boundingBox.appendTo(this.config.windowDom.document.body);
	this.cssRenderUI();
    //phone($("#mNo"),$("#yanZ"));
	//是否显示遮罩
	if(this.config.hasMask){
		this.config.hasMaskWhite ? this._mask = $("<div class='mask_white'></div>") : this._mask = $("<div class='mask'></div>");
		this._mask.appendTo(this.config.windowDom.document.body);
	}	
	
	//定时消失
	_this = this;
	!this.config.setTime && typeof this.config.callBack === "function" && (this.config.setTime = 1);	
	this.config.setTime && setTimeout( function(){ _this.close(); }, _this.config.setTime );
};

TipBox.prototype.bindUI = function(){
	_this = this;			
	
	//点击空白立即取消
	this.config.clickDomCancel && this._mask && this._mask.click(function(){_this.close();});	

	//绑定事件
	this.boundingBox.delegate('.sure','click',function(){
		_this.destroy();
	//	_this.fire('sure');		
	});
	this.boundingBox.delegate('.cancel','click',function(){
		_this.destroy();
//		_this.fire('close'); 		
	});
	
	this.boundingBox.delegate('#showLogin','click',function(){
//		if($('#showLogin i').hasClass('hide')){
//			$('.selectLogin').stop().animate({height:'0',opacity:0},500);
//			$('#showLogin i').removeClass('hide');
//			}else{
//				$('.selectLogin').stop().animate({height:'75px',opacity:1},500).addClass('displayDiv');
//				$('#showLogin i').addClass('hide');
//				};
	});
	
/*	this.boundingBox.delegate('.clickIt','click',function(){
		setTimeDown(".clickIt");
	});*/
	
	if(this.config.sureHandler){
		_this.on('sure',this.config.sureHandler);
	}
	if(this.config.closeHandler){
		_this.on('close',this.config.closeHandler);
	}	
		
};
TipBox.prototype.syncUI = function(){ 			
	this.boundingBox.css({
		width       : this.config.width+'px',
		height      : this.config.height+'px',
		marginLeft  : "-"+(this.config.width/2)+'px',
		marginTop   : "-"+(this.config.height/2)+'px'
	});	
};

//提示效果UI
TipBox.prototype.tipRenderUI = function(){
	var tip="<div class='tipTitle'><span>提示</span></div>";
        tip += "<div class='tip'>";
		tip +="		<div class='icon'>!</div>";
		tip +="		<div class='dec_txt'>"+this.config.str+"</div>";
     	tip +=	"<div class='small_txt'>"+this.config.small_str+"</div>";
		tip += "</div>";
	this.boundingBox.append(tip);
};

//是否执行操作
TipBox.prototype.newIsSubRenderUI = function(){
	var isSub = "<div class='tip'>";
	isSub +="		<div class='icon'>!</div>";
	isSub +="		<div class='dec_txt'>"+this.config.str+"</div>";
	isSub +="		<div class='btn_footer'>";
	isSub +="			<input type='button' data-role='none' class='btn col_red' value='确定' onclick=\"clickOk(\'"+this.config.confirmid+"\');\"/>";
	isSub +="			<input type='button' data-role='none' class='btn cancel col_gray' value='返回' />";
	isSub +="		</div>";
	isSub += "</div>";
	this.boundingBox.append(isSub);
	//new TipBox({type:'isSub',str:'是否删除',height:220});
	}

//confirm UI
TipBox.prototype.confirmRenderUI = function(){

	var tip="<div class='tipTitle'><span>提示</span></div>";
        tip += "<div class='tip'>";
	tip +="		<div class='icon'>!</div>";
	tip +="		<div class='dec_txt'>"+this.config.str+"</div>";
	tip +=	"<div class='small_txt'>"+this.config.small_str+"</div>";
	if(this.config.btn=="short"){
		tip +="		<div class='btn_footer'>";
		tip +="			<input data-role='none' type='button' class='btn cancel col_red' value='取消' />";
		tip +="			<input data-role='none' type='button' class='btn sure col_gray' value='跳过' />";
		tip +="		</div>";
	}else{
		tip +="		<div class='btn_footer'>";
		tip +="			<input type='button' data-role='none' class='btn2 cancel col_yellow' value='重新获取验证码' />";
		tip +="			<input type='button' data-role='none' class='btn2 sure col_gray' value='跳过' />";
		tip +="		</div>";
	}
		tip += "</div>";
	this.boundingBox.append(tip);
};

//成功效果UI
TipBox.prototype.successRenderUI = function(){
	var suc="<div class='tipTitle'><span>提示</span></div>";
        suc += "<div class='success'>";
		suc +="	<div class='icon'>";
     	suc +="<div >";
		suc +=		"<div class='line_short'></div>";
		suc +=		"<div class='line_long'></div>	";		
		suc +=  "</div></div>";
	    suc +=	"<div class='dec_txt'>"+this.config.str+"</div>";
//	    suc +=	"<div class='small_txt'>"+this.config.small_str+"</div>";
		suc += "</div>";
	this.boundingBox.append(suc);
};

//错误效果UI
TipBox.prototype.errorRenderUI = function(){
	var err="<div class='tipTitle'><span>提示</span></div>";
        err += "<div class='lose'>";
		err +=	"	<div class='icon'>";
		err +=	"		<div class='icon_box'>";
		err +=	"			<div class='line_left'></div>";
		err +=	"			<div class='line_right'></div>";
		err +=	"		</div>";
		err +=	"	</div>";
		err +=	"<div class='dec_txt'>"+this.config.str+"</div>";
    	err +=	"<div class='small_txt'>"+this.config.small_str+"</div>";
        if(this.config.btn=="have"){
			err+= "<div class='btn_footer'>" +
			      "<input type='button' data-role='none' class='btn3 col_yellow' value='刷新' />"+
			"</div>";
		}
		err +=	"</div>";
	this.boundingBox.append(err);
};

//加载动画load UI
TipBox.prototype.loadRenderUI = function(){
    var load ="<div class='tipTitle'><span>提示</span></div>";
	    load += "<div class='load '>";
		load += "<div class='icon_box'>";
	for(var i = 1; i < 4; i++ ){
		load += "<div class='cirBox"+i+"'>";
		load += 	"<div class='cir1'></div>";
		load += 	"<div class='cir2'></div>";
		load += 	"<div class='cir3'></div>";
		load += 	"<div class='cir4'></div>";
		load += "</div>";
	}
	load += "</div>";
	load += "</div>";
	load += "<div class='dec_txt'>"+this.config.str+"</div>";
	load +=	"<div class='small_txt'>"+this.config.small_str+"</div>";
	this.boundingBox.append(load);
};

//输入验证码
TipBox.prototype.checkRenderUI = function(){
	var check =  "<div class='importbox'>";
		check += "<div class='importTitle'><p>请输入验证码</p></div>";
		check += "<div class='importCenter clearfix'>";
		check += "<input type='tel' data-role='none' maxlength='4' class='validate-code' onkeyup='checkCode();' /><a class='changeImg' href='javascript:;'><img width='100px' height='40px' src='static/images/header.jpg' /></a></div>";
		check += "<div class='btn_footer'>" +
            "<input type='button' value='确定' id='set_erYzm' class='btn col_gray'>";

		check += "</div>"
		check += "</div>";
		check += "<div id='infobar' style='color:#D00606;margin-top:15px;padding-left:30px;'></div>";
	this.boundingBox.append(check);	
};

//输入手机号码赠
TipBox.prototype.giveRenderUI = function(){
	var give =  "<div class='importbox'>";
		give += "<div class='importTitle'><p>请输入你要赠送的人的手机号码</p></div>";
		give += "<div class='giveContCenter clearfix'>";
        give +="<i class=' iconfont'>&#xe64b;</i>";
		give += "<input type='text' data-role='none' maxlength='11' placeholder='请输入手机号码' id='givephoneNum' onkeyup='checkPhone();' /></div>";
		give += "<div class='btn_footer'><input type='button' data-role='none' id='givephonebtn' value='确定' class='btn3 ' disabled='disabled' onclick=\"toGiveCard(\'"+this.config.confirmid+"\');\" /></div>";
		give += "<p class='sign' data-role='none' id='givemsg'>赠送成功后，代金券让放置该手机号码的账户中！</p>";
		give == "</div>";
	this.boundingBox.append(give);	
};

//输入手机号码 领取红包
TipBox.prototype.getpagRenderUI = function(){
    var getpag = '<div class="c_content">';
    getpag += '<h3 class="tip_h3">请输入手机号领取红包</h3>';
    getpag +=' <div class="userPhoneNum">';
        getpag += '<ul class="tanX_buJ">';
    getpag += '<li class="d_box">';
    getpag += '<span><i class=" iconfont">&#xe64b;</i></span>';
    getpag += ' <p class="d_flex">';
    getpag += ' <input type="text" maxlength="11" placeholder="请输入您的手机号码"   name="phone" value="" id="mNo">';
    getpag += '  <input type="button" id="getCodeBtn" class="getCheckNum yzm" value="获取验证码">';
    getpag += '</p>';
    getpag += '</li>';
    getpag += '  <li class="d_box">';
    getpag += ' <span><i class=" iconfont">&#xe64a;</i></span>';
    getpag += ' <p class="d_flex">';
    getpag += '<input type="text" maxlength="11" placeholder="请输入验证码">';
    getpag += '</p>';
    getpag += '</li>';
    getpag += ' </ul>';
    getpag += ' </div>';
    getpag += ' <div class="btn_boxY">';
    getpag += '     <input data-role="none" type="button" value="确定" />';
    getpag += ' </div>';
    getpag += ' </div>';

	this.boundingBox.append(getpag);

};

TipBox.prototype.newUserRenderUI = function(){
	var newUser = "<div class='importbox'>";
	newUser += 	"<div class='importTitle'><p data-role='none'>请输入手机号领取红包</p></div>";
	newUser += 	"<ul class='inputUl'>";
	newUser +=		"<li>";
	newUser += 			"<i data-role='none' class='f_l iconImg iconfont'>&#xe64b;</i>";
	newUser += 			"<p data-role='none'><input data-role='none' type='tel' id='phoneNum' value='' placeholder='请输入手机号' onkeyup='checkNum()'  maxlength='11'></p>";
	newUser += 			"<button data-role='none' onclick='return false' class='yzm'>获取验证码</button>";
	newUser += 		"</li>";
	newUser +=		"<li>";
	newUser += 			"<i data-role='none' class='f_l iconImg iconfont'>&#xe64a;</i>";
	newUser += 			"<p data-role='none'><input data-role='none' type='text' id='yanZ'  placeholder='请输入验证码' value='' maxlength='6'></p>";
	newUser += 		"</li>";
	newUser +=	"</ul>";
	newUser +=	"<div class='btn_boxY'>";
	newUser +=		"<input data-role='none' type='button' value='确定' />";
	newUser +=	"</div>";
	newUser +=	"<div class='userLoginDiv'>";
	newUser +=		"<p data-role='none'>其他登录方式</p>";
	newUser +=		"<p data-role='none' class='hidePtxt'>More anthentichion</p>"
	newUser +=      "<div class='selectLogin' style='opacity:0; height:0; display:none;'><a data-role='none' href='www.baidu.com' class='QQLogin'><i data-role='none'></i>QQ登录</a><a data-role='none' href='javascript:;' class='payLogin'><i data-role='none'></i>支付宝登录</a><a data-role='none' href='javascript:;' class='weixinLogin'><i data-role='none'></i>微信登录</a></div>"
	newUser +=      "<div id='showLogin'><i data-role='none' class='moreLogin'></i></div>";
	newUser += 	"</div>";
	newUser += "</div>";
	this.boundingBox.append(newUser);
	//new TipBox({type:'newUser',height:'300'});
	}



//笑脸弹出框
TipBox.prototype.smailRenderUI = function(){
    var smail="<div class='tipTitle'><span>提示</span></div>";
	 smail += "<div class='tip'>";
	smail += "<div class='smailCont'>";
    smail +="<i class='iconfont'>&#xe616;</i>";
    smail +="</div>";
	smail += "<div class='dec_txt smailCont_txt'>"+this.config.str+"</div>";
	smail += "</div>";
	this.boundingBox.append(smail);
	//new TipBox({type:'smail',str:'亲，红包与优惠券不能一起使用只能选择一种优惠方式哦~',setTime:2000});
	}
/*//微信提示
TipBox.prototype.weixinRenderUI = function(){
	var weixin  = "<div class='lose'>";
	weixin +=	"	<div class='wei_xin'>";
	weixin +=         "<div class='wei_icon'></div>";
	weixin +=	"	</div>";
	weixin +=	"<div class='dec_txt'>"+this.config.str+"</div>";
	weixin += "<div class='btn_footer'>" +
            	"<input type='button' value='微信没打开？' class='btn cancel col_green'/>" +
	            "<input type='button' value='可以上网了' class='btn col_orange'/>"+
	         " </div>";

	weixin +=	"</div>";
	this.boundingBox.append(weixin);
};
//支付宝提示
TipBox.prototype.playRenderUI = function(){
	var play  = "<div class='lose'>";
	play +=	"	<div class='new_play'>";
	play +=         "<div class='small_play'></div>";
	play +=	"	</div>";
	play +=	"<div class='dec_txt'>"+this.config.str+"</div>";
	play += "<div class='btn_footer'>" +
	              "<input type='button' value='微信没打开？' class='btn cancel col_orange'/>" +
		          "<input type='button' value='可以上网了' class='btn col_yellow'/>"+
	        " </div>";
	play +=	"</div>";

	this.boundingBox.append(play);
};

//获得优惠卷
TipBox.prototype.getCardUI = function(){
	var card  = "<div class='getCard'>";
	card += "<p>恭喜您，已获取<span>";
	card += this.config.str+"元</span>优惠券</p>";
	card += "<p>已发送至"+this.config.small_str+"账号中</p>";
	card += "<div class='btn_footer'><input type='button' value='确定' class='btn3 sure col_yellow' /></div>"
	card +=	"</div>";

	this.boundingBox.append(card);
};*/

//查看优惠卡包====
TipBox.prototype.giveCoupons = function(){
	var Coupons =  "<div class='importbox'>";
Coupons += "<div class='text_des'><p>优惠已存入您的优惠券卡包中~</p><p>去 <a id='toMyCard'>“我的 → 优惠卡包”</a>查看</p></div>";
Coupons == "</div>";
this.boundingBox.append(Coupons);
};


////首次买单分享红包====
TipBox.prototype.giveRedBao = function(){
	var redBao =  "<div class='importbox'>";
	redBao += "<div class='text_des'><p>您已经领过该优惠，不可以重复领取！</p><p>首次<a>买单</a>成功还可以再送分享红包哦~ </p></div>";
	redBao == "</div>";
	this.boundingBox.append(redBao);
};



//传颜色
TipBox.prototype.cssRenderUI = function(){
	this.boundingBox.find(".icon").css({
		"borderColor":this.config.color,
		"color":this.config.color
	}).find("div div").css("backgroundColor",this.config.color);
	//this.boundingBox.find(".load .icon_box div div").css("backgroundColor",this.config.color);
};

//关闭
TipBox.prototype.close = function(){	
	this.destroy();
	this.config.setTime && typeof this.config.callBack === "function" && this.config.callBack();				
};

//销毁
TipBox.prototype.destroy = function(){
	this._mask && this._mask.remove();
	this.boundingBox && this.boundingBox.remove(); 
	this.boundingBox = null;
};
//触发事件
TipBox.prototype.fire = function(type){	
	var arrayEvent = this.handlers[type];
	if (arrayEvent instanceof Array) { 
		for (var i=0; i < arrayEvent.length; i++) {
			if (typeof arrayEvent[i] === "function"){
				arrayEvent[i]({type: type}); 
				
				//执行后删除事件
				arrayEvent.splice(i,1); 
			}
		}
	}    
	return this; 
};

function setTimeDown(temp){
	
	if(1){
          var b=0;
          var timer=59;
          if(b==0){
              var _thisVal=$(temp);
              _thisVal.html(timer);
              var tim=setInterval(function(){
                  _thisVal.html(timer);
                  timer--;
                  if(timer<0){
                      timer=59;
                      clearInterval(tim);
                      _thisVal.html("重新获取").css({
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
              },(1000*timer))
          }
      }else{
		  
       $(".error_yzm").show();
      }
	
	}
