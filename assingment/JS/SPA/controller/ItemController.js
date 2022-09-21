$(".itemHomeNavi").click(function () {
    $("#carouselExampleIndicators").css('display', 'block');
    $("#customerPage").css('display', 'none');
});

/*Item Form Text Field Validations*/

let regItemCode = /^(I00-)[0-9]{4}$/;
let regItemName = /^[A-z 0-9.]{3,}$/;
let regItemUnitPrice = /^[0-9]{1,}([.][0-9]{2})?$/;
let regItemQty = /^[0-9]{1,}$/;

let searchItemCode;

// Add Item Form Validations
$('#txtIcode,#txtItemName,#txtItemUnitPrice,#txtItemQty').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$('#txtIcode,#txtItemName,#txtItemUnitPrice,#txtItemQty').on('blur', function () {
    addItemFormValidation();
});

$("#txtIcode").on('keyup', function (event) {
    setAddItemButtonDisableOrNot();
    if (event.key == "Enter") {
        checkIfAddItemFormValid();
    }
});

$("#txtItemName").on('keyup', function (event) {
    setAddItemButtonDisableOrNot();
    if (event.key == "Enter") {
        checkIfAddItemFormValid();
    }
});

$("#txtItemUnitPrice").on('keyup', function (event) {
    setAddItemButtonDisableOrNot();
    if (event.key == "Enter") {
        checkIfAddItemFormValid();
    }
});

$("#txtItemQty").on('keyup', function (event) {
    setAddItemButtonDisableOrNot();
    if (event.key == "Enter") {
        checkIfAddItemFormValid();
    }
});

function addItemFormValidation() {
    var itemCode = $("#txtIcode").val();
    $("#txtIcode").css('border', '2px solid green');
    $("#itemCodeError").text("");
    if (regItemCode.test(itemCode)) {
        var itemName = $("#txtItemName").val();
        if (regItemName.test(itemName)) {
            $("#txtItemName").css('border', '2px solid green');
            $("#itemNameError").text("");
            var itemUnitPrice = $("#txtItemUnitPrice").val();
            if (regItemUnitPrice.test(itemUnitPrice)) {
                var itemQty = $("#txtItemQty").val();
                var response = regItemQty.test(itemQty);
                $("#txtItemUnitPrice").css('border', '2px solid green');
                $("#itemUnitPriceError").text("");
                if (response) {
                    $("#txtItemQty").css('border', '2px solid green');
                    $("#itemQtyError").text("");
                    return true;
                } else {
                    $("#txtItemQty").css('border', '2px solid red');
                    $("#itemQtyError").text("Item Qty is a required field.Pattern : 100");
                    return false;
                }
            } else {
                $("#txtItemUnitPrice").css('border', '2px solid red');
                $("#itemUnitPriceError").text("Unit Price is a required field.Pattern : 100.00 or 100");
                return false;
            }
        } else {
            $("#txtItemName").css('border', '2px solid red');
            $("#itemNameError").text("Item name is a required field.");
            return false;
        }
    } else {
        $("#txtIcode").css('border', '2px solid red');
        $("#itemCodeError").text("Item Code is a required field.Pattern : I00-0001");
        return false;
    }
}

function setAddItemButtonDisableOrNot() {
    let check = addItemFormValidation();
    if (check) {
        $("#btnAddItem").attr('disabled', false);
    } else {
        $("#btnAddItem").attr('disabled', true);
    }
}

function checkIfAddItemFormValid() {
    var itemCode = $("#txtIcode").val();
    if (regItemCode.test(itemCode)) {
        $("#txtItemName").focus();
        var itemName = $("#txtItemName").val();
        if (regItemName.test(itemName)) {
            $("#txtItemUnitPrice").focus();
            var itemUnitPrice = $("#txtItemUnitPrice").val();
            if (regItemUnitPrice.test(itemUnitPrice)) {
                $("#txtItemQty").focus();
                var itemQty = $("#txtItemQty").val();
                var response = regItemQty.test(itemQty);
                if (response) {
                    let res = confirm("Do you want to add this Item..?");
                    if (res) {
                        addItem();
                        loadAllItems();
                        clearItemFields();
                        genarateItemCode();
                    }
                } else {
                    $("#txtItemQty").focus();
                }
            } else {
                $("#txtItemUnitPrice").focus();
            }
        } else {
            $("#txtItemName").focus();
        }
    } else {
        $("#txtIcode").focus();
    }
}

// Update Item Form Validations

$('#txtSearchItemCode,#txtIName,#txtIUnitPrice,#txtIQty').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#txtSearchItemCode").keyup(function (event) {
    searchItemCode = $("#txtSearchItemCode").val();
    if (regItemCode.test(searchItemCode)) {
        $("#txtSearchItemCode").css('border', '2px solid green');
        $("#searchItemCodeError").text("");
        if (event.key == "Enter") {
            var foundOrNot = false;
            let foundItem = searchItem(searchItemCode);
            if (foundItem) {
                $("#txtIName").val(foundItem.getName());
                $("#txtIUnitPrice").val(foundItem.getUnitPrice());
                $("#txtIQty").val(foundItem.getQty());
                $("#btnUpdateItem").prop('disabled', false);
                foundOrNot = true;
                $("#txtIName").css('border', '2px solid green');
                $("#txtIUnitPrice").css('border', '2px solid green');
                $("#txtIQty").css('border', '2px solid green');
                $("#txtIName").focus();
            }
            if (foundOrNot == false) {
                $("#txtIName").val("");
                $("#txtIUnitPrice").val("");
                $("#txtIQty").val("");
                $("#txtIName").css('border', '1px solid #ced4da');
                $("#txtIUnitPrice").css('border', '1px solid #ced4da');
                $("#txtIQty").css('border', '1px solid #ced4da');
                $("#btnUpdateItem").prop('disabled', true);
                swal({
                    title: "Error!",
                    text: "Item Not Found.",
                    icon: "warning",
                    button: "Close",
                    timer: 2000
                });
            }
        }
    } else {
        $("#txtSearchItemCode").css('border', '2px solid red');
        $("#searchItemCodeError").text("Item code is a required field.Pattern : I00-0001");
        $("#btnUpdateItem").prop('disabled', true);
    }
});

$("#txtIName").keyup(function (event) {
    var iName = $("#txtIName").val();
    if (regItemName.test(iName)) {
        $("#txtIName").css('border', '2px solid green');
        $("#inameError").text("");
        if (event.key == "Enter") {
            $("#txtIUnitPrice").focus();
        }
        var iCode = $("#txtSearchItemCode").val();
        var iUnitPrice = $("#txtIUnitPrice").val();
        var iQty = $("#txtIQty").val();

        if (regItemCode.test(iCode) && regItemName.test(iName) && regItemUnitPrice.test(iUnitPrice) && regItemQty.test(iQty)) {
            $("#btnUpdateItem").prop('disabled', false);
        }

    } else {
        $("#btnUpdateItem").prop('disabled', true);
        $("#txtIName").css('border', '2px solid red');
        $("#inameError").text("Item name is a required field.");
    }
});

$("#txtIUnitPrice").keyup(function (event) {
    var iUnitPrice = $("#txtIUnitPrice").val();
    if (regItemUnitPrice.test(iUnitPrice)) {
        $("#txtIUnitPrice").css('border', '2px solid green');
        $("#iunitpriceError").text("");
        if (event.key == "Enter") {
            $("#txtIQty").focus();
        }
        var iCode = $("#txtSearchItemCode").val();
        var iName = $("#txtIName").val();
        var iQty = $("#txtIQty").val();

        if (regItemCode.test(iCode) && regItemName.test(iName) && regItemUnitPrice.test(iUnitPrice) && regItemQty.test(iQty)) {
            $("#btnUpdateItem").prop('disabled', false);
        }

    } else {
        $("#btnUpdateItem").prop('disabled', true);
        $("#txtIUnitPrice").css('border', '2px solid red');
        $("#iunitpriceError").text("Unit price is a required field. Pattern : 100.00 or 100");
    }
});

$("#txtIQty").keyup(function (event) {
    var iQty = $("#txtIQty").val();
    if (regItemQty.test(iQty)) {
        $("#txtIQty").css('border', '2px solid green');
        $("#iqtyError").text("");
        var iCode = $("#txtSearchItemCode").val();
        var iName = $("#txtIName").val();
        var iUnitPrice = $("#txtIUnitPrice").val();

        if (regItemCode.test(iCode) && regItemName.test(iName) && regItemUnitPrice.test(iUnitPrice) && regItemQty.test(iQty)) {
            $("#btnUpdateItem").prop('disabled', false);
        }

        if (event.key == "Enter") {
            let res = confirm("Do you want to update this item?");
            if (res) {
                updateItem();
                loadAllItems();
            }
        }

    } else {
        $("#btnUpdateItem").prop('disabled', true);
        $("#txtIQty").css('border', '2px solid red');
        $("#iqtyError").text("item qty is a required field.Pattern : 100");
    }
});

// Delete Item Form Validations

$("#txtSearchIcode").keyup(function (event) {
    searchItemCode = $("#txtSearchIcode").val();
    if (regItemCode.test(searchItemCode)) {
        $("#txtSearchIcode").css('border', '2px solid green');
        $("#searchICodeError").text("");
        if (event.key == "Enter") {
            var foundOrNot = false;
            let foundItem = searchItem(searchItemCode);
            if (foundItem) {
                $("#txtdisabledName").val(foundItem.getName());
                $("#txtdisabledUnitPrice").val(foundItem.getUnitPrice());
                $("#txtdisabledQty").val(foundItem.getQty());
                $("#btnDeleteItem").prop('disabled', false);
                foundOrNot = true;
                $("#btnDeleteItem").focus();
            }
            if (foundOrNot == false) {
                $("#txtdisabledName").val("");
                $("#txtdisabledUnitPrice").val("");
                $("#txtdisabledQty").val("");
                $("#btnDeleteItem").prop('disabled', true);
                swal({
                    title: "Error!",
                    text: "Item Not Found.",
                    icon: "warning",
                    button: "Close",
                    timer: 2000
                });
            }
        }
    } else {
        $("#txtSearchIcode").css('border', '2px solid red');
        $("#searchICodeError").text("Item Code is a required field.Pattern : I00-0001");
        $("#btnDeleteItem").prop('disabled', true);
    }
});

/*End Of Item Form Validations*/

/*CRUD Operations Of Item Form*/

// Add Item

function addItem() {
    let itemCode = $("#txtIcode").val();
    let itemName = $("#txtItemName").val();
    let itemUnitPrice = $("#txtItemUnitPrice").val();
    let itemQty = $("#txtItemQty").val();

    var item = new ItemDTO(itemCode, itemName, itemUnitPrice, itemQty);
    itemDB.push(item);
}

// Search Item

function searchItem(itemCode) {
    for (var i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getCode() == itemCode) {
            return itemDB[i];
        }
    }
}

// Update Item

function updateItem() {
    let updateItemCode = $("#txtSearchItemCode").val();
    let updateItemName = $("#txtIName").val();
    let updateItemUnitprice = $("#txtIUnitPrice").val();
    let updateItemQty = $("#txtIQty").val();

    for (var i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getCode() == updateItemCode) {
            itemDB[i].setCode(updateItemCode);
            itemDB[i].setName(updateItemName);
            itemDB[i].setUnitPrice(updateItemUnitprice);
            itemDB[i].setQty(updateItemQty);

            clearUpdateItemFields();
            $("#btnUpdateItem").prop('disabled', true);
        }
    }
}

// Delete Item

function deleteItem() {
    let searchIcode = $("#txtSearchIcode").val();
    for (var i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getCode() == searchIcode) {
            itemDB.splice(i, 1);
            clearDeleteItemFields();
            $("#btnDeleteItem").prop('disabled', true);
        }
    }
}

// Load All Items

function loadAllItems() {
    $("#itemTable").empty();
    for (var i = 0; i < itemDB.length; i++) {
        let tableRow = `<tr><td>${itemDB[i].getCode()}</td><td>${itemDB[i].getName()}</td><td>${itemDB[i].getUnitPrice()}</td><td>${itemDB[i].getQty()}</td></tr>`;
        $("#itemTable").append(tableRow);
    }
}

/*End Of CRUD Operations Of Item Form*/

/*Other Functions*/

// Generate Item Code

function genarateItemCode() {
    if (itemDB.length == 0) {
        $("#txtIcode").val("I00-0001");
    } else if (itemDB.length > 0) {
        var code = itemDB[itemDB.length - 1].getCode().split("-")[1];
        var tempCode = parseInt(code);
        tempCode = tempCode + 1;
        if (tempCode <= 9) {
            $("#txtIcode").val("I00-000" + tempCode);
        } else if (tempCode <= 99) {
            $("#txtIcode").val("I00-00" + tempCode);
        } else if (tempCode <= 999) {
            $("#txtIcode").val("I00-0" + tempCode);
        } else if (tempCode <= 9999) {
            $("#txtIcode").val("I00-" + tempCode);
        }
    }
}

// Search Item By Table

function searchItemByTable(searchCode) {
    var item = searchItem(searchCode);
    let foundOrNot = false;
    if (item) {
        var code = item.getCode();
        var name = item.getName();
        var unitPrice = item.getUnitPrice();
        var qty = item.getQty();

        $("#itemTable").empty();

        let tableRow = `<tr><td>${code}</td><td>${name}</td><td>${unitPrice}</td><td>${qty}</td></tr>`;
        $("#itemTable").append(tableRow);
        foundOrNot = true;
    }
    if (foundOrNot == false) {
        loadAllItems();
        swal({
            title: "Error!",
            text: "Item Not Found.",
            icon: "warning",
            button: "Close",
            timer: 2000
        });
    }
}

/*Controller Functions*/
// Add Item Form

$("#addItem").on('shown.bs.modal', function () {
    $(this).find("#txtIcode").focus();
    genarateItemCode();
});

$("#btnAddItem").prop('disabled', true);

$("#btnAddItem").click(function () {
    let res = confirm("Do you want to add this item?");
    if (res) {
        addItem();
        loadAllItems();
        clearItemFields();
        genarateItemCode();
    }
});

$("#btnclearitemform").click(function () {
    clearItemFields();
    genarateItemCode();
});

function clearItemFields() {
    $("#txtIcode").focus();

    $("#txtIcode").val("");
    $("#txtItemName").val("");
    $("#txtItemUnitPrice").val("");
    $("#txtItemQty").val("");

    $("#itemCodeError").text("");
    $("#itemNameError").text("");
    $("#itemUnitPriceError").text("");
    $("#itemQtyError").text("");

    $("#txtIcode").css('border', '1px solid #ced4da');
    $("#txtItemName").css('border', '1px solid #ced4da');
    $("#txtItemUnitPrice").css('border', '1px solid #ced4da');
    $("#txtItemQty").css('border', '1px solid #ced4da');

    $("#btnAddItem").prop('disabled', true);
}

// Update Item Form

$("#updateItem").on('shown.bs.modal', function () {
    $(this).find("#txtSearchItemCode").focus();
})

$("#btnUpdateItem").prop('disabled', true);

$("#btnUpdateItem").click(function () {
    let res = confirm("Do you want to update this item?");
    if (res) {
        updateItem();
        loadAllItems();
    }
});

$("#btnClearUpdateItem").click(function () {
    $("#btnUpdateItem").prop('disabled', true);
    clearUpdateItemFields();
});

function clearUpdateItemFields() {
    $("#txtSearchItemCode").focus();

    $("#txtSearchItemCode").val("");
    $("#txtIName").val("");
    $("#txtIUnitPrice").val("");
    $("#txtIQty").val("");

    $("#searchItemCodeError").text("");
    $("#inameError").text("");
    $("#iunitpriceError").text("");
    $("#iqtyError").text("");

    $("#txtSearchItemCode").css('border', '1px solid #ced4da');
    $("#txtIName").css('border', '1px solid #ced4da');
    $("#txtIUnitPrice").css('border', '1px solid #ced4da');
    $("#txtIQty").css('border', '1px solid #ced4da');
}

// Delete Item Form

$("#btnDeleteItem").prop('disabled', true);

$("#deleteItem").on('shown.bs.modal', function () {
    $(this).find("#txtSearchIcode").focus();
});

$("#btnDeleteItem").click(function () {
    let res = confirm("Do you want to delete this item?");
    if (res) {
        deleteItem();
        loadAllItems();
    }
});

$("#btnClearDeleteItemFormFields").click(function () {
    $("#btnDeleteItem").prop('disabled', true);
    clearDeleteItemFields();
});

function clearDeleteItemFields() {
    $("#txtSearchIcode").focus();

    $("#txtSearchIcode").val("");
    $("#txtdisabledName").val("");
    $("#txtdisabledUnitPrice").val("");
    $("#txtdisabledQty").val("");

    $("#searchICodeError").text("");
}

//Other

$("#searchItemForm").submit(function (e) {
    e.preventDefault();
});

$("#txtSIcode").on('keyup', function (event) {
    var itemCode = $("#txtSIcode").val();
    if (regItemCode.test(itemCode)) {
        $("#txtSIcode").css('border','2px solid green');
        if (event.key == "Enter") {
            searchItemByTable(itemCode);
        }
    }else{
        $("#txtSIcode").css('border','2px solid red');
    }
});

$("#btnSearchItem").click(function () {
    var itemCode = $("#txtSIcode").val();
    searchItemByTable(itemCode);
});

$("#btnClearSearchItemField").click(function () {
    $("#txtSIcode").val("");
    $("#txtSIcode").css('border', '1px solid #ced4da');
    loadAllItems();
});