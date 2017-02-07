/**
 * Created by NHY on 2017/1/19.
 */
(function(){
    var icon='';
    var title="";
    var url="";
    var power="";
    //打开弹窗
    $("#add-column").click(function(){
        $("#bg").show();
        var temp=template("headColumnTemp");
        $("#head-column").html(temp);
        $("#head-column").show();
    });
    //常规和高级切换
    $("body").on('click',"column-add-common",function(){
        $(".head-column-content1").show();
        $(".head-column-content2").hide();
        $(this).addClass("head-column-nav-active").siblings().removeClass("head-column-nav-active");
    });
    $("body").on('click',".column-add-special",function(){
        $(".head-column-content1").show();
        $(".head-column-content2").hide();
        $(this).addClass("head-column-nav-active").siblings().removeClass("head-column-nav-active");
    });
    //图标选择
    $("body").on('click',"input[name='column-img']",function(){
        if($("#imgselect").is(":checked")){
            $("#seticon").show();
        }else{
            $("#seticon").hide();
        }
    });
    $("body").on('click',".column-cancel",function(){
        delColumn();
    });
    $("body").on('click',".column-add-btn",function(){
        addDetail();
    });
    $("body").on('click',".column-back-btn",function(){
        addBack();
    });
    //设置可见
    $("body").on('click',"input[name='column-link']",function(){
        if($("#selecticon").is(":checked")){
            $(".column-link").show();
        }else{
            $(".column-link").hide();
        }
    });
    //选择图标
    $("body").on('click',".column-icon-content li",function(){
        $(this).addClass("icon-active").siblings().removeClass("icon-active");
    });
    //选定图标
    $("body").on('click',"#iconSure",function(){
        $(".column-icon-content").find("li").each(function(){
            if($(this).hasClass("icon-active")){
                icon=$(this).find("img")[0].src;
            }
        });
        addBack();
    });
    //新增节点
    $("body").on('click',".addHeader",function(){
        //Header(title,url,icon,power,system)
        title=$("#headTitle").val();
        url="";
        power=$("input[name='column-power']:checked").val();
        var system=false;
        var value='';
        $("input[name='column-img']").each(function(){
            if($(this).is(":checked")) value=$(this).val();
        });
        switch(value){
            case '1':
                icon=getAbsoluteUrl("/Public/style/station/images/template1/head1.png");
                break;
            case '2':
                icon=false;
                break;
            case '3':
                if($('#addHeaderIcon').val()){
                    icon=$('#addHeaderIcon').attr('data-url');
                }else{
                    var iconUrl=$(".icon-active").find("img").attr("src");
                    icon=getAbsoluteUrl(iconUrl);
                }
                break;
            default:break;
        }
        new Header(title,url,icon,power);
        //var dx = document.getElementById('addHeaderIcon');
        //dx.value = '';
        //if(document.selection){
        //    dx.select();
        //    document.selection.clear();
        //}
        //$("#headTitle").val("");
        //$("#writeUrl").val("");
        delColumn();
    });
    function delColumn(){
        $("#bg").hide();
        $("#head-column").hide();
        $("#head-column").empty();
    }
    function addDetail(){
        $("#bg1").show();
        $(".head-column-set-img").show();
    }
    function addBack(){
        $("#bg1").hide();
        $(".head-column-set-img").hide();
    }
})();

//模板显示图文
$("#hasImg1").click(function(){
    $("#iframe").contents().find(".template-head li").each(function(){
        $(this).find("img").show();
        $(this).css("textAlign","left");
    });
});
$("#hasImg2").click(function(){
    $("#iframe").contents().find(".template-head li").each(function(){
        $(this).find("img").hide();
        $(this).css("textAlign","center");
    });
});
//获取图片地址
$('body').on("change","#addHeaderIcon",function(){
    $.ajaxFileUpload({
        url: "/index.php/Home/Station/ajax_upload_images",
        type: 'post',
        data: {'file_name': 'addHeaderIcon'},
        secureuri: false,
        fileElementId: 'addHeaderIcon',
        dataType: 'json',
        success: function (data) {
            var url=data.data.src;
            $("#addHeaderIcon").attr("data-url",url);
        },
        error: function (data) {
            alert('图片选取失败'+data);
        }
    });
});