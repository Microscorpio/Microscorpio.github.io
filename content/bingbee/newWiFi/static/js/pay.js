$(function(){


    divTop();
    $(".pay_money h3").click(function(){

        if($(this).attr("nth")==0){
            $(".payM_subtraction").slideDown();
            $(this).attr("nth",1);
            $(this).find(".icon").html("&#xe686;");

        }else{

            if(parseInt($(".payM_subtraction input").val())>0){
                $(this).attr("nth",1);
                $(this).find(".icon").html("&#xe686;");
            }else{
                $(".payM_subtraction").slideUp();
                $(this).attr("nth",0);
                $(this).find(".icon").html("&#xe685;");
            }

        }

    });
});
function divTop(){

    $(".payment_center").css({
        "marginTop":$(".header").height()+$(".pay_money").height()+"px"
    });
}