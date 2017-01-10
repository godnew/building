/**
 * Created by NHY on 2017/1/7.
 */
(function(w){
    function ImageText(data){
        this.id=Date.now();
        this.title=data.title||"图文展示";
        this.img=data.src;
        this.url=data.url||" ";
        this.text=data.intro||' ';
        this.module=this.bindStyle(data.template_id);
        this.dom=$("<div class='module imageText dads-children module"+data.template_id+"' index="+this.id+"></div>");
    }
    ImageText.prototype={
        constructor:ImageText,
        bindTemplate:function(){
            this.bindDom();
            this.bindEvent();
        },
        bindDom:function(){
            var str='<div class="module-top">'+
                '<h3>'+this.title+'</h3>'+
                '</div>'+
                '<div>'+
                '<a href="'+this.url+'">'+
                '<img src="'+this.img+'" alt=""></a>'+
                '<p>'+this.text+'</p>'+
                '</div>';
            this.dom.html(str);
            this.dom.append(this.module);
            $("#iframe").contents().find('#content').prepend(this.dom);
        },
        bindStyle:function(id){
            var str='';
            switch(id){
                case 1:str+='<style>'+
                '.imageText {background: #fff;}'+
                '.imageText.module1[index='+this.id+'] > div:nth-of-type(2) img {display: none;}'+
                '.imageText.module1[index='+this.id+'] > div:nth-of-type(2) p {font-size: 14px;color: #333;padding: 15px;}'+
                '</style>';
                    break;
                case 2:str+='<style>'+
                '.imageText.module2[index='+this.id+'] > div:nth-of-type(2) img {width: 100%;}'+
                '.imageText.module2[index='+this.id+'] > div:nth-of-type(2) p {font-size: 14px;color: #333;padding: 15px;}'+
                '</style>';
                    break;
                case 3:str+='<style>'+
                '.imageText.module3[index='+this.id+'] > div:after {clear: both;content:".";height: 0;line-height: 0;visibility: hidden;display: block;}'+
                '.imageText.module3[index='+this.id+'] > div:nth-of-type(2) img {width: 50%;float: left;}'+
                '.imageText.module3[index='+this.id+'] > div:nth-of-type(2) p {width:50%;font-size: 14px;color: #333;padding: 15px;float: left;box-sizing: border-box}'+
                '</style>';
                    break;
                case 4:str+='<style>'+
                '.imageText.module4[index='+this.id+'] > div:after {clear: both;content: ".";height: 0;line-height: 0;visibility: hidden;display: block;}'+
                '.imageText.module4[index='+this.id+'] > div:last-child img {width: 50%;float: right;}'+
                '.imageText.module4[index='+this.id+'] > div:last-child p {width:50%;font-size: 14px;color: #333;padding: 15px;float: left;box-sizing: border-box;}'+
                '</style>';
                    break;
                default:
                    break;
            }
            return str;
        },
        bindEvent:function(){
        }
    };

    w.module_id4=function(data){
        return new ImageText(data);
    };
})(window);
(function(){
    $("#iframe").load(function() {
        $(".content-left-list").on("click", "#moduleID01", function () {
                $("#imageText,#imageTextBg").show();
            }
        );
        $(".imageTextClose").click(function () {
            $("#imageText,#imageTextBg").hide();
        });
        //模块内容选择
        $("#imageTextStyle li").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            var index = $(this).attr('index');
            $(".imageTextModule").hide();
            var showModule = ".imageTextModule" + index;
            $(showModule).show();
        });
        $("#imageTextSave").click(function () {
            var index = 0;
            $("#imageTextStyle").find('li').each(function () {
                if ($(this).hasClass("active")) index = $(this).attr('index');
            });
            var title = $('#imageTextNav').val();
            var text = $("#imageTextText" + index).val();
            var url = $("#imageTextUrl" + index).val();
            var img;
            if ($("#imgTextFile" + index).length) {
                img = getFileUrl("imgTextFile" + index);
            }
            var data={};
            data.title=title;
            data.src=img;
            data.intro=text;
            data.template_id=index;
            data.url=url;
            module_id1(data).bindTemplate();
            $('#imageTextNav').val("");
            $("#imageTextText" + index).val("");
            $("#imageTextUrl" + index).val("http://");
            $("#imgPre" + index).attr('src', 'images/exampleImage.png');
            $("#imageText,#imageTextBg").hide();
        });
    });
})();