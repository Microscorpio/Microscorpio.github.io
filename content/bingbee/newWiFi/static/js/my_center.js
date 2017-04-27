//验证手机号码，获取验证码
function phone(mNo,yanZ){
    if( mNo.attr("date_text")){
        mNo.val($("#mNo").attr("date_text"));
    }
    yanZ.val(yanZ.attr("date_text"));

    var reg =/0?(13|14|15|18)[0-9]{9}/;
    mNo.keyup(function(){
        if($(this).val().length == 11){
            if($(this).val()!=" " && reg.test($(this).val())){
                $(".yzm").css({
                    "background":"#f7b53c ",
                    "color":"#fff"
                });
            }
        }else{
            $(".yzm").css({
                "background":"#e9e9e9",
                "color":"#bebebe"
            });
        }
    });

    //模拟input的placeholder属性
    var value_t="",date_textT="";
    for(var i=0;i<arguments.length;i++){
        $(arguments[i]).focus(function(){
            value_t= $(this).val(),date_textT=$(this).attr("date_text");
            if(value_t==date_textT){
                $(this).val("");
            }else{
                $(this).val(value_t);
            }
        });
        $(arguments[i]).blur(function(){
            value_t= $(this).val();date_textT=$(this).attr("date_text");
            if(!value_t){
                $(this).val(date_textT)
            }
        });
    }
}
phone($("#mNo"),$("#yanZ"));

var date_mask = false;
//日期滑动方法================
var indexY = 1, indexM = 1, indexD = 1,indexH=1,indexI=1;
var index_num = 0, ul_top = 0, li_he = $("#yearwrapper ul li").height();
var now_year = 0, now_month = 0, now_day = 0,now_hour= 0,now_min=0;
var now_yearFlag = false, now_monthFlag = false, now_dayFlag = false,now_minFlag=false,now_hourFlag=false;
var date_S=[];

$(function(){

//一层验证码
    var click_flag=0;
    $(".yzm").click(function(){
            new TipBox({type:'check'});
    });

//基本资料选择头像
    $(".min_logo").click(function(){
        $("#check-mask").show();
        $(".photo_choose").show().animate({bottom:"0"},10);
    });
    $(".photo_choose ul li:last-child,#check-mask").click(function(){
        $("#check-mask").hide();
        $(".photo_choose").hide().animate({bottom:"-184px"},10);
    });

 
 
 /*---------- 个人中心兴趣爱好--------*/


//    兴趣爱好分类切换
     $(".left_className ul li").click(function(){
         $(this).addClass("actived").siblings("li").removeClass("actived");
        $(".right_xiangQ ul:eq("+$(this).index()+")").show().siblings("ul").hide();
     });

//点击兴趣添加

    $(".xiangQ_list li b").click(function(){
       var interest_val= $(this).siblings("span").text();
        var _this=$(this);
            if( $(this).hasClass("active")){
                $(this).removeClass("active");
                show_link(interest_val);
            }else{
                if($(".link_buts p").length<5) {
                    $(this).addClass("active");
                    var in_str = ' <p><b>' + interest_val + '</b> <span><i class="icon iconfont"></i></span></p>';
                    $(".link_buts").append(in_str);
                    p_remove();
                }
            }
    });
    p_remove();
    function p_remove(){
        $(".link_buts p").click(function(){
            $(this).remove();
            var _this=$(this);
            $(".xiangQ_list li").each(function(){
                if($(this).find("span").text()==_this.find("b").text()){
                    $(this).find("b").removeClass("active");
                }
            });
        });
    };


    function show_link(val){
        $(".link_buts p").each(function(){
            if(val==$(this).find("b").html()){
                $(this).remove();
            }
        });
    }


    //显示行程日期弹框===========
    $(".add_click").click(function () {
        show_deta($(this));
        $(this).unbind("click");
    });

    $(".l_timeTs span:eq(0)").click(function(){
           show_deta($(this));
        $(this).unbind("click");
    });
    $(".l_timeTs span:eq(1)").click(function(){
        show_deta($(this));
        $(this).unbind("click");
    });
    $(".birthday_set").click(function(){
        show_deta($(this));
        $(this).unbind("click");
    });

    //隐藏行程日期弹框  and  获得滑动日期=============
    $("#check-mask").click(function(){
             hideMask();
    });

});
var date_val="";
function show_deta(flagF){
    $("body").addClass("hidde_body");
    date_mask = true;
    var left_jul = $(window).width() / 2 - ($("#viewport").width() / 2)
    $("#viewport").css({
        left: left_jul + "px",
        display:"block"
    })
    $("#check-mask").show();
    date_val=flagF
}

$(".gray_btn,.big_btn").click(function(){
    hideMask();
    date_val.html(getDate(false));
});
//隐藏弹框
function  hideMask() {
    $("body").removeClass("hidde_body");
    if (date_mask) {
        date_mask = false;
        $("#check-mask").hide();
        $("#viewport").hide();
    }
}
//获取日期=======
function getDate(flag) {
    if(!flag){
        if (now_yearFlag && now_monthFlag && now_dayFlag ) {
            date_S=[now_year,now_month,now_day];
            return date_S;
        } else {//判断如果其中有些列没有滑动就获取默认的值
            if (!now_yearFlag) {
                now_year = $("#yearwrapper ul li:eq(1) span").html();
            } else {
                now_year = now_year;
            }
            if (!now_monthFlag) {
                now_month = $("#monthwrapper ul li:eq(1) span").html();
            } else {
                now_month = now_month;
            }
            if (!now_dayFlag) {
                now_day = $("#daywrapper ul li:eq(1) span").html();
            } else {
                now_day = now_day;
            }

            date_S=[now_year+'年'+now_month+'月'+now_day+'日'];
            return date_S;
        }
    }else{
        if (now_yearFlag && now_monthFlag && now_dayFlag && now_hourFlag && now_minFlag) {
            date_S=[now_year,now_month,now_day,now_hour,now_min];
            return date_S;
        } else {//判断如果其中有些列没有滑动就获取默认的值
            if (!now_yearFlag) {
                now_year = $("#yearwrapper ul li:eq(1) span").html();
            } else {
                now_year = now_year;
            }
            if (!now_monthFlag) {
                now_month = $("#monthwrapper ul li:eq(1) span").html();
            } else {
                now_month = now_month;
            }
            if (!now_dayFlag) {
                now_day = $("#daywrapper ul li:eq(1) span").html();
            } else {
                now_day = now_day;
            }
            if (!now_hourFlag) {
                now_hour = $("#Hourwrapper ul li:eq(1) span").html();
            } else {
                now_hour = now_hour;
            }
            if (!now_minFlag) {
                now_min = $("#Minutewrapper ul li:eq(1) span").html();
            } else {
                now_min = now_min;
            }
            date_S=[now_year,now_month,now_day,now_hour,now_min];
            return date_S;
        }
    }
}

//循环弹框——>选择日期li===============================
var nowdate_New = new Date(), nowdate=nowdate_New.getFullYear(),beginyear=1990 ;
var   beginmonth=1,endmonth=12,  beginday=1, endday=31,   beginhour=0,endhour=23,  beginminute=0,endminute=59;

//创建 --年-- 列表
function createYEAR_UL(){
    var str="";
    for(var i=beginyear; i<=nowdate;i++){
        str+='<li><span>'+i+'</span>年</li>'
    }
    return str+"<li>&nbsp;</li>";
}
//创建 --月-- 列表
function createMONTH_UL(){
    var str="";
    for(var i=beginmonth;i<=endmonth;i++){
        if(i<10){
            i="0"+i
        }
        str+='<li><span>'+i+'</span>月</li>'
    }
    return str+"<li>&nbsp;</li>";
}
//创建 --日-- 列表
function createDAY_UL(){
    $("#daywrapper ul").html("");
    var str="";
    for(var i=beginday;i<=endday;i++){
        str+='<li><span>'+i+'</span>日</li>'
    }
    return str+"<li>&nbsp;</li>";
}
//创建 --时-- 列表
function createHOURS_UL(){
    var str2="";
    for(var i=beginhour;i<=endhour;i++){
        str2+='<li><span>'+i+'</span>时</li>'
    }
    return str2+"<li>&nbsp;</li>";
}
//创建 --分-- 列表
function createMINUTE_UL(){
    var str="";
    for(var i=beginminute;i<=endminute;i++){
        if(i<10){
            i="0"+i
        }
        str+='<li><span>'+i+'</span>分</li>'
    }
    return str+"<li>&nbsp;</li>";;
}

//日期滑动
var li_he=50;
function init_iScrll_year() {
    yearScroll = new iScroll("yearwrapper", {
        snap: "li", vScrollbar: false,
        onScrollEnd: function () {
            now_yearFlag = true
            dayScroll.refresh();

//                    获取滑动后的当前年份
            ul_top = $("#yearwrapper ul").css("transform")
            var str = ul_top.split(",")
            str = str[str.length - 1].split("-");
            str = str[str.length - 1].split(")");
            var last_top = parseInt(str[0]);
            index_num=Math.floor(last_top/li_he);
            now_year = $("#yearwrapper ul li:eq(" + (index_num+1) + ") span").html();

        }
    });
}
function init_iScrll_month() {
    monthScroll = new iScroll("monthwrapper", {
        snap: "li", vScrollbar: false,
        onScrollEnd: function () {
            now_monthFlag = true;
            dayScroll.refresh();

//                    获取滑动后的当前月份
            ul_top = $("#monthwrapper ul").css("transform")
            var str = ul_top.split(",")
            str = str[str.length - 1].split("-");
            str = str[str.length - 1].split(")");
            var last_top = parseInt(str[0]);
            index_num = Math.floor(last_top / li_he);
            now_month = $("#monthwrapper ul li:eq(" + (index_num + 1) + ") span").html();
        }
    });
}
function init_iScrll_day() {
    dayScroll = new iScroll("daywrapper", {
        snap: "li", vScrollbar: false,
        onScrollEnd: function () {
            now_dayFlag = true;
            dayScroll.refresh();

            //获取滑动后的当前号数
            ul_top = $("#daywrapper ul").css("transform")
            var str = ul_top.split(",")
            str = str[str.length - 1].split("-");
            str = str[str.length - 1].split(")");
            var last_top = parseInt(str[0]);
            index_num = Math.floor(last_top / li_he);
            now_day = $("#daywrapper ul li:eq(" + (index_num + 1) + ") span").html();
        }
    });
}
function init_iScrll_hour() {
    HourScroll = new iScroll("Hourwrapper", {
        snap: "li", vScrollbar: false,
        onScrollEnd: function () {
            now_hourFlag = true;
            HourScroll.refresh();
            //获取滑动后的当前小时
            ul_top = $("#Hourwrapper ul").css("transform")
            var str = ul_top.split(",")
            str = str[str.length - 1].split("-");
            str = str[str.length - 1].split(")");
            var last_top = parseInt(str[0]);
            index_num = Math.floor(last_top / li_he);
            now_hour = $("#Hourwrapper ul li:eq(" + (index_num + 1) + ") span").html();
        }
    })
}
function init_iScrll_minu() {
    MinuteScroll = new iScroll("Minutewrapper",{
        snap:"li",vScrollbar:false,
        onScrollEnd:function () {
            now_minFlag=true
            HourScroll.refresh();
            //获取滑动后的当前分钟
            ul_top = $("#Minutewrapper ul").css("transform")
            var str = ul_top.split(",")
            str = str[str.length - 1].split("-");
            str = str[str.length - 1].split(")");
            var last_top = parseInt(str[0]);
            index_num = Math.floor(last_top / li_he);
            now_min = $("#Minutewrapper ul li:eq(" + (index_num + 1) + ") span").html();
        }})
}



 


















