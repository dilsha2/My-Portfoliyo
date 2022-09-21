$(".placeOrderHomeNavi").click(function () {
    $("#carouselExampleIndicators").css('display', 'block');
    $("#customerPage").css('display', 'none');
});

$('#txtOrderDate').val(new Date().toISOString().slice(0, 10));
$("#btnAddToCart").prop('disabled', true);
$("#btnPlaceOrder").prop('disabled', true);
let regBuyItemQty = /^[0-9]{1,}$/;

// Generate Order Id
function generateOId() {
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

// Add Listener method to customer id combo box for search customer details
$("#cmbSelectCustomerId").change(function () {
    var id = $("#cmbSelectCustomerId").find('option:selected').text();
    var found = false;
    for (var i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getId() == id) {
            $("#txtpocName").val(customerDB[i].getName());
            $("#txtpocaddress").val(customerDB[i].getAddress());
            $("#txtpocsalary").val(customerDB[i].getSalary());
            var code = $("#cmbitemcode").find('option:selected').text();
            if (code != "-Select Item-" && $("#txtbuyQty").val() != '') {
                $("#btnAddToCart").prop('disabled', false);
            }
            found = true;
        }
    }
    if (found == false) {
        $("#txtpocName").val("");
        $("#txtpocaddress").val("");
        $("#txtpocsalary").val("");
        $("#btnAddToCart").prop('disabled', true);
    }
});

// Add Listener method to item code combo box for search item details
$("#cmbitemcode").change(function () {
    var code = $("#cmbitemcode").find('option:selected').text();
    var found = false;
    for (var i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getCode() == code) {
            $("#txtpoiName").val(itemDB[i].getName());
            $("#txtitemPrice").val(itemDB[i].getUnitPrice());
            let qtyOnHand = parseInt(itemDB[i].getQty());

            var changedTempQty = false;
            for (var j = 0; j < cartTMDB.length; j++) {
                if (cartTMDB[j].getICode() == code) {
                    let cartQty = cartTMDB[j].getBuyQty();
                    let tempQty = qtyOnHand - cartQty;
                    $("#txtqtyOnHand").val(tempQty);
                    changedTempQty = true;
                }
            }

            if (changedTempQty == false) {
                $("#txtqtyOnHand").val(itemDB[i].getQty());
            }

            var id = $("#cmbSelectCustomerId").find('option:selected').text();
            if (id != "-Select Customer-" && $("#txtbuyQty").val() != '') {
                $("#btnAddToCart").prop('disabled', false);
            }
            found = true;
        }
    }
    if (found == false) {
        $("#txtpoiName").val("");
        $("#txtitemPrice").val("");
        $("#txtqtyOnHand").val("");
        $("#btnAddToCart").prop('disabled', true);
    }
});

// Add Validation for buy qty text field
$("#txtbuyQty").on('keyup', function () {
    addValidation();
});

// Add Validation to buy qty field and check if comboboxes are empty or not.
function addValidation() {
    var buyQty = $("#txtbuyQty").val();
    if (regBuyItemQty.test(buyQty)) {
        $("#txtbuyQty").css('border', '2px solid green');
        var code = $("#cmbitemcode").find('option:selected').text();
        var id = $("#cmbSelectCustomerId").find('option:selected').text();
        if (id != "-Select Customer-" && code != "-Select Item-") {
            $("#btnAddToCart").prop('disabled', false);
        }
    } else {
        $("#txtbuyQty").css('border', '2px solid red');
        $("#btnAddToCart").prop('disabled', true);
    }
}

// Add items to cart
$("#btnAddToCart").click(function () {
    var qtyOnHand = parseInt($("#txtqtyOnHand").val());
    var buyQty = parseInt($("#txtbuyQty").val());
    if (buyQty <= qtyOnHand) {
        addItemsToCart();
        loadCartItemsToTable();
        clearSelectItemFields();
        calculateTotalAndNoOfItems();
        $("#cartTable>tr").on('dblclick', function () {
            var itemCode = $(this).children(":eq(0)").text();
            for (var i = 0; i < cartTMDB.length; i++) {
                if (cartTMDB[i].getICode() == itemCode) {
                    cartTMDB.splice(i, 1);
                }
            }
            loadCartItemsToTable();
            calculateTotalAndNoOfItems();
            clearSelectItemFields();
        });

    } else {
        swal({
            title: "Error!",
            text: "Buy qty is incorrect.Please enter low quantity.",
            icon: "warning",
            button: "Close",
            timer: 2000
        });
    }
});

function addItemsToCart() {
    var itemCode = $("#cmbitemcode").find('option:selected').text();
    var itemName = $("#txtpoiName").val();
    var itemPrice = $("#txtitemPrice").val();
    var qtyOnHand = parseInt($("#txtqtyOnHand").val());
    var qty = $("#txtbuyQty").val();
    var buyQty = parseInt(qty);
    var unitPrice = parseFloat(itemPrice);
    var total = buyQty * unitPrice;

    var cart = new CartTM(itemCode, itemName, itemPrice, buyQty, total);

    var found = false;

    for (var i = 0; i < cartTMDB.length; i++) {
        if (cartTMDB[i].getICode() == itemCode) {
            var tempQty = parseInt(cartTMDB[i].getBuyQty()) + buyQty;
            cartTMDB[i].setBuyQty(tempQty);
            let itemTotal = tempQty * unitPrice;
            cartTMDB[i].setItemTotal(itemTotal);
            found = true;
        }
    }

    if (found == false) {
        cartTMDB.push(cart);
    }
}

// load cart items to table
function loadCartItemsToTable() {
    $("#cartTable").empty();
    for (var i = 0; i < cartTMDB.length; i++) {
        let tableRow = `<tr><td>${cartTMDB[i].getICode()}</td><td>${cartTMDB[i].getIName()}</td><td>${cartTMDB[i].getItemPrice()}</td><td>${cartTMDB[i].getBuyQty()}</td><td>${cartTMDB[i].getItemTotal()}</td></tr>`;
        $("#cartTable").append(tableRow);
    }
}

// clear Selected Item Fields
function clearSelectItemFields() {
    $("#cmbitemcode").val("");
    $("#txtpoiName").val("");
    $("#txtitemPrice").val("");
    $("#txtqtyOnHand").val("");
    $("#txtbuyQty").val("");
    $("#txtbuyQty").css('border', '1px solid #ced4da');
    $("#btnAddToCart").prop('disabled', true);
}

// Calculate Total and No Of Items
function calculateTotalAndNoOfItems() {
    let ttl = 0;
    for (var i = 0; i < cartTMDB.length; i++) {
        ttl = ttl + cartTMDB[i].getItemTotal();
    }
    $("#txtTotal").val(ttl + "/=");
    $("#txtBalance").val(ttl + "/=");
    $("#txtNoOfItems").val(cartTMDB.length);
}

// Calculate Balance when Cash paid
$("#txtCash").keyup(function (event) {
    if (event.key == "Enter") {
        let ttl = 0;
        for (var i = 0; i < cartTMDB.length; i++) {
            ttl = ttl + cartTMDB[i].getItemTotal();
        }
        let cash = parseInt($("#txtCash").val());
        let balance = ttl - cash;
        $("#txtBalance").val(balance + "/=");

        var code = $("#cmbitemcode").find('option:selected').text();
        var id = $("#cmbSelectCustomerId").find('option:selected').text();
        if (id != "-Select Customer-" && cartTMDB.length != 0) {
            $("#btnPlaceOrder").prop('disabled', false);
        }
    }
});

// Clear Selected item details fields
$("#btnClearItemFields").click(function () {
    clearSelectItemFields();
});

// Cancel Order
$("#btnCancelOrder").click(function () {
    clearPlaceOrderForm();
    loadCartItemsToTable();
});

// Clear Place order form
function clearPlaceOrderForm() {
    $("#cmbSelectCustomerId").val("");
    $("#txtpocName").val("");
    $("#txtpocaddress").val("");
    $("#txtpocsalary").val("");

    $("#cmbitemcode").val("");
    $("#txtpoiName").val("");
    $("#txtitemPrice").val("");
    $("#txtqtyOnHand").val("");
    $("#txtbuyQty").val("");
    $("#txtbuyQty").css('border', '1px solid #ced4da');

    $("#txtTotal").val("");
    $("#txtNoOfItems").val("");
    $("#txtCash").val("");
    $("#txtBalance").val("");

    cartTMDB.splice(0, cartTMDB.length);

    $("#btnAddToCart").prop('disabled', true);

    $("#btnPlaceOrder").prop('disabled', true);
}

// Place Order
$("#btnPlaceOrder").click(function () {
    let orderId = $("#txtOrderId").val();
    let orderDate = $("#txtOrderDate").val();
    let customerId = $("#cmbSelectCustomerId").find('option:selected').text();
    let total = $("#txtTotal").val().split("/")[0];

    var order = new OrderDTO(orderId, orderDate, customerId, total);
    orderDB.push(order);

    for (var i = 0; i < cartTMDB.length; i++) {
        var orderDetail = new OrderDetailsDTO(orderId, cartTMDB[i].getICode(), cartTMDB[i].getIName(), cartTMDB[i].getItemPrice(), cartTMDB[i].getBuyQty(), cartTMDB[i].getItemTotal());
        manageItemQtyOnHand(cartTMDB[i].getICode(), cartTMDB[i].getBuyQty());
        orderDetailsDB.push(orderDetail);
    }
    clearPlaceOrderForm();
    loadCartItemsToTable();
    loadOrderTable();
    loadOrderDetailTable();
    generateOId();

    swal({
        title: "Success!",
        text: "Place Order Successfully",
        icon: "success",
        button: "Ok",
        timer: 2000
    });

});

// Manage Item Quantity
function manageItemQtyOnHand(itemCode, buyQty) {
    for (var i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getCode() == itemCode) {
            let tempQty = parseInt(itemDB[i].getQty());
            let qtyOnHand = tempQty - buyQty;
            itemDB[i].setQty(qtyOnHand);
        }
    }
}

// Load Order Table
function loadOrderTable() {
    $("#orderTable").empty();
    for (var i = 0; i < orderDB.length; i++) {
        let tableRow = `<tr><td>${orderDB[i].getOrderId()}</td><td>${orderDB[i].getOrderDate()}</td><td>${orderDB[i].getCustomerId()}</td><td>${orderDB[i].getTotal()}</td></tr>`;
        $("#orderTable").append(tableRow);
    }
}

// Load Order Details Table
function loadOrderDetailTable() {
    $("#orderDetailsTable").empty();
    for (var i = 0; i < orderDetailsDB.length; i++) {
        let tableRow = `<tr><td>${orderDetailsDB[i].getOrderId()}</td><td>${orderDetailsDB[i].getItemCode()}</td><td>${orderDetailsDB[i].getItemName()}</td><td>${orderDetailsDB[i].getUnitPrice()}</td><td>${orderDetailsDB[i].getBuyQty()}</td><td>${orderDetailsDB[i].getTotal()}</td></tr>`;
        $("#orderDetailsTable").append(tableRow);
    }
}

// Search Order details from Order Table and Order Detail Table
function searchOrderByOrderTable(orderId) {
    let order = searchOrderByOrderDB(orderId);
    var found = false;
    if (order) {
        let oid = order.getOrderId();
        let orderDate = order.getOrderDate();
        let customerId = order.getCustomerId();
        let total = order.getTotal();

        $("#orderTable").empty();

        let tableRow = `<tr><td>${oid}</td><td>${orderDate}</td><td>${customerId}</td><td>${total}</td></tr>`;
        $("#orderTable").append(tableRow);

        found = true;
    }
    if (found == false) {
        loadOrderTable();
        loadOrderDetailTable();
        swal({
            title: "Error!",
            text: "Order Not Found",
            icon: "warning",
            button: "Close",
            timer: 2000
        });
    }
}

function searchOrderByOrderDetailTable(orderId) {
    $("#orderDetailsTable").empty();
    for (var i = 0; i < orderDetailsDB.length; i++) {
        if(orderDetailsDB[i].getOrderId()==orderId){
            let tableRow = `<tr><td>${orderDetailsDB[i].getOrderId()}</td><td>${orderDetailsDB[i].getItemCode()}</td><td>${orderDetailsDB[i].getItemName()}</td><td>${orderDetailsDB[i].getUnitPrice()}</td><td>${orderDetailsDB[i].getBuyQty()}</td><td>${orderDetailsDB[i].getTotal()}</td></tr>`;
            $("#orderDetailsTable").append(tableRow);
        }
    }
}

function searchOrderByOrderDB(searchOID) {
    for (var i = 0; i < orderDB.length; i++) {
        if (orderDB[i].getOrderId() == searchOID) {
            return orderDB[i];
        }
    }
}

// Search Order
let regOrderId = /^(O-)[0-9]{4}$/;

$("#searchOrder").on('shown.bs.modal', function () {
    $(this).find("#txtSearchOrderId").focus();
});

// btn search order function
$("#btnSearchOrder").click(function (){
   let searchOid = $("#txtSearchOrderId").val();
   searchOrderByOrderDetailTable(searchOid);
   searchOrderByOrderTable(searchOid);
});

// btn clear search field function
$("#btnClearSearchOrderField").click(function () {
   $("#txtSearchOrderId").val("");
   $("#txtSearchOrderId").css('border','1px solid #ced4da');
   $("#txtSearchOrderId").focus();
   loadOrderTable();
   loadOrderDetailTable();
});

// add validation to search order text field
$("#txtSearchOrderId").keyup(function (event) {
    let searchOid = $("#txtSearchOrderId").val();
    if(regOrderId.test(searchOid)){
        $("#txtSearchOrderId").css('border','2px solid green');
        if(event.key=="Enter"){
            searchOrderByOrderDetailTable(searchOid);
            searchOrderByOrderTable(searchOid);
        }
    }else{
        $("#txtSearchOrderId").css('border','2px solid red');
    }
});
