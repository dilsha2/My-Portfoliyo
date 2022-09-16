/*-----------------Manage Sections------------------------------*/
$("#Home_a").click(function () {
    $("#Home").css("display", "block");
    $("#Item_Section").css("display", "None");
    $("#Order").css("display", "None");
    $("#Customer_Section").css("display", "None");
})
$("#Pos").click(function () {
    $("#Home").css("display", "block");
    $("#Order").css("display", "None");
    $("#Item_Section").css("display", "None");
    $("#Customer_Section").css("display", "None");
})
$("#Item_a").click(function () {
    $("#Item_Section").css("display", "block");
    $("#Order").css("display", "None");
    $("#Home").css("display", "none");
    $("#Customer_Section").css("display", "none");
})
$("#Customer_a").click(function () {
    $("#Customer_Section").css("display", "block");
    $("#Order").css("display", "None");
    $("#Item_Section").css("display", "none");
    $("#Home").css("display", "none");
})
$("#PlaceOrder_a").click(function () {
    $("#Order").css("display", "block");
    $("#Customer_Section").css("display", "none");
    $("#Item_Section").css("display", "none");
    $("#Home").css("display", "none");
})
