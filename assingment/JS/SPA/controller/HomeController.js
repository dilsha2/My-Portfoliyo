$(".naviItem-1").click(function () {
    $("#carouselExampleIndicators").css('display', 'block');
    $("#customerPage").css('display', 'none');
    $("#itemPage").css('display', 'none');
    $("#placeOrderPage").css('display', 'none');
});

$(".naviItem-2").click(function () {
    $("#carouselExampleIndicators").css('display', 'none');
    $("#customerPage").css('display', 'block');
    $("#itemPage").css('display', 'none');
    $("#placeOrderPage").css('display', 'none');
});

$(".naviItem-3").click(function () {
    $("#carouselExampleIndicators").css('display', 'none');
    $("#customerPage").css('display', 'none');
    $("#itemPage").css('display', 'block');
    $("#placeOrderPage").css('display', 'none');
});

$("#placeOrderForm").click(function () {
    $("#carouselExampleIndicators").css('display', 'none');
    $("#customerPage").css('display', 'none');
    $("#itemPage").css('display', 'none');
    $("#placeOrderPage").css('display', 'block');
    generateOrderId();
    setCustomerIdsToComboBox();
    setItemCodesToComboBox();
});

function generateOrderId() {
    if (orderDB.length == 0) {
        $("#txtOrderId").val("O-0001");
    } else if (orderDB.length > 0) {
        var orderId = orderDB[orderDB.length - 1].getOrderId().split("-")[1];
        var tempId = parseInt(orderId);
        tempId = tempId + 1;
        if (tempId <= 9) {
            $("#txtOrderId").val("O-000" + tempId);
        } else if (tempId <= 99) {
            $("#txtOrderId").val("O-00" + tempId);
        } else if (tempId <= 999) {
            $("#txtOrderId").val("O-0" + tempId);
        } else if (tempId <= 9999) {
            $("#txtOrderId").val("O-" + tempId);
        }
    }
}

function setCustomerIdsToComboBox() {
    $("#cmbSelectCustomerId").empty();
    $("#cmbSelectCustomerId").append(new Option("-Select Customer-",""));
    for (var i = 0; i < customerDB.length; i++) {
        $("#cmbSelectCustomerId").append(new Option(customerDB[i].getId(),i));
    }
}

function setItemCodesToComboBox() {
    $("#cmbitemcode").empty();
    $("#cmbitemcode").append(new Option("-Select Item-",""));
    for (var i = 0; i < itemDB.length; i++) {
        $("#cmbitemcode").append(new Option(itemDB[i].getCode(),i));
    }
}