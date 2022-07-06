$(function () {
    //修改按钮名称增加为新增
    $("[data-name=\"add_item\"]>span").text("新增")
    //调整摘要的控件的长度
    $("#id_abstract").attr("style", "width:80%")
})