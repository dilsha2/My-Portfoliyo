$(".customerHomeNavi").click(function () {
    $("#carouselExampleIndicators").css('display', 'block');
    $("#customerPage").css('display', 'none');
});

/*Customer Form Text Field Validations*/

let regCusId = /^(C00-)[0-9]{4}$/;
let regCustName = /^[A-z .]{3,}$/;
let regCustAddress = /^[A-z ,.0-9]{3,}$/;
let regCustSalary = /^[1-9][0-9]{3,}(.[0-9]{2})?$/;

let searchCustId;

// Add Customer Form Validations
$('#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$('#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary').on('blur', function () {
    addCustomerFormValidation();
});

$("#txtCustomerId").on('keyup', function (event) {
    setAddCustomerButtonDisableOrNot();
    if (event.key == "Enter") {
        checkIfAddCustomerFormValid();
    }
});

$("#txtCustomerName").on('keyup', function (event) {
    setAddCustomerButtonDisableOrNot();
    if (event.key == "Enter") {
        checkIfAddCustomerFormValid();
    }
});

$("#txtCustomerAddress").on('keyup', function (event) {
    setAddCustomerButtonDisableOrNot();
    if (event.key == "Enter") {
        checkIfAddCustomerFormValid();
    }
});

$("#txtCustomerSalary").on('keyup', function (event) {
    setAddCustomerButtonDisableOrNot();
    if (event.key == "Enter") {
        checkIfAddCustomerFormValid();
    }
});

function addCustomerFormValidation() {
    var custId = $("#txtCustomerId").val();
    $("#txtCustomerId").css('border', '2px solid green');
    $("#customerIdError").text("");
    if (regCusId.test(custId)) {
        var custName = $("#txtCustomerName").val();
        if (regCustName.test(custName)) {
            $("#txtCustomerName").css('border', '2px solid green');
            $("#customerNameError").text("");
            var custAddress = $("#txtCustomerAddress").val();
            if (regCustAddress.test(custAddress)) {
                var custSalary = $("#txtCustomerSalary").val();
                var response = regCustSalary.test(custSalary);
                $("#txtCustomerAddress").css('border', '2px solid green');
                $("#customerAddressError").text("");
                if (response) {
                    $("#txtCustomerSalary").css('border', '2px solid green');
                    $("#customerSalaryError").text("");
                    return true;
                } else {
                    $("#txtCustomerSalary").css('border', '2px solid red');
                    $("#customerSalaryError").text("Customer Salary is a required field.Pattern : 1000.00 or 1000");
                    return false;
                }
            } else {
                $("#txtCustomerAddress").css('border', '2px solid red');
                $("#customerAddressError").text("Customer address is a required field.");
                return false;
            }
        } else {
            $("#txtCustomerName").css('border', '2px solid red');
            $("#customerNameError").text("Customer name is a required field.");
            return false;
        }
    } else {
        $("#txtCustomerId").css('border', '2px solid red');
        $("#customerIdError").text("Cust ID is a required field.Pattern : C00-0001");
        return false;
    }
}

function setAddCustomerButtonDisableOrNot() {
    let check = addCustomerFormValidation();
    if (check) {
        $("#btnRegisterCustomer").attr('disabled', false);
    } else {
        $("#btnRegisterCustomer").attr('disabled', true);
    }
}

function checkIfAddCustomerFormValid() {
    var custID = $("#txtCustomerId").val();
    if (regCusId.test(custID)) {
        $("#txtCustomerName").focus();
        var custName = $("#txtCustomerName").val();
        if (regCustName.test(custName)) {
            $("#txtCustomerAddress").focus();
            var custAddress = $("#txtCustomerAddress").val();
            if (regCustAddress.test(custAddress)) {
                $("#txtCustomerSalary").focus();
                var custSalary = $("#txtCustomerSalary").val();
                var response = regCustSalary.test(custSalary);
                if (response) {
                    let res = confirm("Do you want to add this Customer..?");
                    if (res) {
                        addCustomer();
                        clearCustomerFields();
                        loadAllCustomers();
                        generateCustomerId();
                    }
                } else {
                    $("#txtCustomerSalary").focus();
                }
            } else {
                $("#txtCustomerAddress").focus();
            }
        } else {
            $("#txtCustomerName").focus();
        }
    } else {
        $("#txtCustomerId").focus();
    }
}

// Update Customer Form Validations

$('#txtSearchCustomerId,#txtCName,#txtCaddress,#txtCsalary').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#txtSearchCustomerId").keyup(function (event) {
    searchCustId = $("#txtSearchCustomerId").val();
    if (regCusId.test(searchCustId)) {
        $("#txtSearchCustomerId").css('border', '2px solid green');
        $("#searchCustIdError").text("");
        if (event.key == "Enter") {
            var foundOrNot = false;
            let foundCustomer = searchCustomer(searchCustId);
            if (foundCustomer) {
                $("#txtCName").val(foundCustomer.getName());
                $("#txtCaddress").val(foundCustomer.getAddress());
                $("#txtCsalary").val(foundCustomer.getSalary());
                $("#btnUpdateCust").prop('disabled', false);
                foundOrNot = true;
                $("#txtCName").css('border', '2px solid green');
                $("#txtCaddress").css('border', '2px solid green');
                $("#txtCsalary").css('border', '2px solid green');
                $("#txtCName").focus();
            }
            if (foundOrNot == false) {
                $("#txtCName").val("");
                $("#txtCaddress").val("");
                $("#txtCsalary").val("");
                $("#btnUpdateCust").prop('disabled', true);
                $("#txtCName").css('border', '1px solid #ced4da');
                $("#txtCaddress").css('border', '1px solid #ced4da');
                $("#txtCsalary").css('border', '1px solid #ced4da');
                swal({
                    title: "Error!",
                    text: "Customer Not Found.",
                    icon: "warning",
                    button: "Close",
                    timer: 2000
                });
            }
        }
    } else {
        $("#txtSearchCustomerId").css('border', '2px solid red');
        $("#searchCustIdError").text("Cust ID is a required field.Pattern : C00-0001");
        $("#btnUpdateCust").prop('disabled', true);
    }
});

$("#txtCName").keyup(function (event) {
    var custName = $("#txtCName").val();
    if (regCustName.test(custName)) {
        $("#txtCName").css('border', '2px solid green');
        $("#cNameError").text("");
        if (event.key == "Enter") {
            $("#txtCaddress").focus();
        }
        var custId = $("#txtSearchCustomerId").val();
        var custSalary = $("#txtCsalary").val();
        var custAddress = $("#txtCaddress").val();

        if (regCusId.test(custId) && regCustName.test(custName) && regCustAddress.test(custAddress) && regCustSalary.test(custSalary)) {
            $("#btnUpdateCust").prop('disabled', false);
        }

    } else {
        $("#btnUpdateCust").prop('disabled', true);
        $("#txtCName").css('border', '2px solid red');
        $("#cNameError").text("Cust name is a required field.");
    }
});

$("#txtCaddress").keyup(function (event) {
    var custAddress = $("#txtCaddress").val();
    if (regCustAddress.test(custAddress)) {
        $("#txtCaddress").css('border', '2px solid green');
        $("#cAddressError").text("");
        if (event.key == "Enter") {
            $("#txtCsalary").focus();
        }
        var custId = $("#txtSearchCustomerId").val();
        var custName = $("#txtCName").val();
        var custSalary = $("#txtCsalary").val();

        if (regCusId.test(custId) && regCustName.test(custName) && regCustAddress.test(custAddress) && regCustSalary.test(custSalary)) {
            $("#btnUpdateCust").prop('disabled', false);
        }

    } else {
        $("#btnUpdateCust").prop('disabled', true);
        $("#txtCaddress").css('border', '2px solid red');
        $("#cAddressError").text("Customer address is a required field.");
    }
});

$("#txtCsalary").keyup(function (event) {
    var custSalary = $("#txtCsalary").val();
    if (regCustSalary.test(custSalary)) {
        $("#txtCsalary").css('border', '2px solid green');
        $("#cSalaryError").text("");
        var custId = $("#txtSearchCustomerId").val();
        var custName = $("#txtCName").val();
        var custAddress = $("#txtCaddress").val();

        if (regCusId.test(custId) && regCustName.test(custName) && regCustAddress.test(custAddress) && regCustSalary.test(custSalary)) {
            $("#btnUpdateCust").prop('disabled', false);
        }

        if (event.key == "Enter") {
            let res = confirm("Do you want to update this customer?");
            if (res) {
                updateCustomer();
                loadAllCustomers();
            }
        }

    } else {
        $("#btnUpdateCust").prop('disabled', true);
        $("#txtCsalary").css('border', '2px solid red');
        $("#cSalaryError").text("Customer Salary is a required field.Pattern : 1000.00 or 1000");
    }
});

// Delete Customer Form Validations

$("#txtSearchCId").keyup(function (event) {
    searchCustId = $("#txtSearchCId").val();
    if (regCusId.test(searchCustId)) {
        $("#txtSearchCId").css('border', '2px solid green');
        $("#searchCustomerIdError").text("");
        if (event.key == "Enter") {
            var foundOrNot = false;
            let foundCustomer = searchCustomer(searchCustId);
            if (foundCustomer) {
                $("#txtdcName").val(foundCustomer.getName());
                $("#txtdcAddress").val(foundCustomer.getAddress());
                $("#txtdcSalary").val(foundCustomer.getSalary());
                $("#btnDeleteCustomer").prop('disabled', false);
                foundOrNot = true;
                $("#btnDeleteCustomer").focus();
            }
            if (foundOrNot == false) {
                $("#txtdcName").val("");
                $("#txtdcAddress").val("");
                $("#txtdcSalary").val("");
                $("#btnDeleteCustomer").prop('disabled', true);
                swal({
                    title: "Error!",
                    text: "Customer Not Found.",
                    icon: "warning",
                    button: "Close",
                    timer: 2000
                });
            }
        }
    } else {
        $("#txtSearchCId").css('border', '2px solid red');
        $("#searchCustomerIdError").text("Cust ID is a required field.Pattern : C00-0001");
        $("#btnDeleteCustomer").prop('disabled', true);
    }
});

/*End Of Customer Form Text Field Validations*/

/*CRUD Operations Of Customer Form*/

// Add Customer

function addCustomer() {
    let customerId = $("#txtCustomerId").val();
    let customerName = $("#txtCustomerName").val();
    let customerAddress = $("#txtCustomerAddress").val();
    let customerSalary = $("#txtCustomerSalary").val();

    var customer = new CustomerDTO(customerId, customerName, customerAddress, customerSalary);
    customerDB.push(customer);
}

// Search Customer

function searchCustomer(searchId) {
    for (var i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getId() == searchId) {
            return customerDB[i];
        }
    }
}

// Update Customer

function updateCustomer() {
    let updateCustId = $("#txtSearchCustomerId").val();
    let updateCustName = $("#txtCName").val();
    let updateCustAddress = $("#txtCaddress").val();
    let updateCustSalary = $("#txtCsalary").val();

    for (var i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getId() == updateCustId) {
            customerDB[i].setId(updateCustId);
            customerDB[i].setName(updateCustName);
            customerDB[i].setAddress(updateCustAddress);
            customerDB[i].setSalary(updateCustSalary);

            clearUpdateCustomerFields();
            $("#btnUpdateCust").prop('disabled', true);
        }
    }
}

// Delete Customer

function deleteCustomer() {
    let searchCustomerId = $("#txtSearchCId").val();
    for (var i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getId() == searchCustomerId) {
            customerDB.splice(i, 1);
            clearDeleteCustomerFields();
            $("#btnDeleteCustomer").prop('disabled', true);
        }
    }
}

// Load all customers

function loadAllCustomers() {
    $("#customerTable").empty();
    for (var i = 0; i < customerDB.length; i++) {
        let tableRow = `<tr><td>${customerDB[i].getId()}</td><td>${customerDB[i].getName()}</td><td>${customerDB[i].getAddress()}</td><td>${customerDB[i].getSalary()}</td></tr>`;
        $("#customerTable").append(tableRow);
    }
}

/*End Of CRUD Operations*/

/*Other Functions*/

// Generate Customer Id

function generateCustomerId() {
    if (customerDB.length == 0) {
        $("#txtCustomerId").val("C00-0001");
    } else if (customerDB.length > 0) {
        var id = customerDB[customerDB.length - 1].getId().split("-")[1];
        var tempId = parseInt(id);
        tempId = tempId + 1;
        if (tempId <= 9) {
            $("#txtCustomerId").val("C00-000" + tempId);
        } else if (tempId <= 99) {
            $("#txtCustomerId").val("C00-00" + tempId);
        } else if (tempId <= 999) {
            $("#txtCustomerId").val("C00-0" + tempId);
        } else if (tempId <= 9999) {
            $("#txtCustomerId").val("C00-" + tempId);
        }
    }
}

// Search Customer By Table

function searchCustomerByTable(searchId) {
    var customer = searchCustomer(searchId);
    let foundOrNot = false;
    if (customer) {
        var id = customer.getId();
        var name = customer.getName();
        var address = customer.getAddress();
        var salary = customer.getSalary();

        $("#customerTable").empty();

        let tableRow = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
        $("#customerTable").append(tableRow);
        foundOrNot = true;
    }
    if (foundOrNot == false) {
        loadAllCustomers();
        swal({
            title: "Error!",
            text: "Customer Not Found.",
            icon: "warning",
            button: "Close",
            timer: 2000
        });
    }
}

/*Controller Functions*/
// Add Customer Form

$("#registerCustomer").on('shown.bs.modal', function () {
    $(this).find("#txtCustomerId").focus();
    generateCustomerId();
});

$("#btnRegisterCustomer").prop('disabled', true);

$("#btnRegisterCustomer").click(function () {
    let res = confirm("Do you want to add this customer?");
    if (res) {
        addCustomer();
        clearCustomerFields();
        loadAllCustomers();
        generateCustomerId();
    }
});

$("#btnclearcustomerform").click(function () {
    clearCustomerFields();
    generateCustomerId();
});

function clearCustomerFields() {
    $("#txtCustomerId").focus();

    $("#txtCustomerId").val("");
    $("#txtCustomerName").val("");
    $("#txtCustomerAddress").val("");
    $("#txtCustomerSalary").val("");

    $("#customerIdError").text("");
    $("#customerNameError").text("");
    $("#customerAddressError").text("");
    $("#customerSalaryError").text("");

    $("#txtCustomerId").css('border', '1px solid #ced4da');
    $("#txtCustomerName").css('border', '1px solid #ced4da');
    $("#txtCustomerAddress").css('border', '1px solid #ced4da');
    $("#txtCustomerSalary").css('border', '1px solid #ced4da');

    $("#btnRegisterCustomer").prop('disabled', true);
}


// Update Customer Form

$("#btnUpdateCust").prop('disabled', true);

$("#updateCustomer").on('shown.bs.modal', function () {
    $(this).find("#txtSearchCustomerId").focus();
});

$("#btnUpdateCust").click(function () {
    let res = confirm("Do you want to update this customer?");
    if (res) {
        updateCustomer();
        loadAllCustomers();
    }
});

$("#btnClearUpdateCustomer").click(function () {
    $("#btnUpdateCust").prop('disabled', true);
    clearUpdateCustomerFields();
});

function clearUpdateCustomerFields() {
    $("#txtSearchCustomerId").focus();

    $("#txtSearchCustomerId").val("");
    $("#txtCName").val("");
    $("#txtCaddress").val("");
    $("#txtCsalary").val("");

    $("#searchCustIdError").text("");
    $("#cNameError").text("");
    $("#cAddressError").text("");
    $("#cSalaryError").text("");

    $("#txtSearchCustomerId").css('border', '1px solid #ced4da');
    $("#txtCName").css('border', '1px solid #ced4da');
    $("#txtCaddress").css('border', '1px solid #ced4da');
    $("#txtCsalary").css('border', '1px solid #ced4da');
}

// Delete Customer Form

$("#btnDeleteCustomer").prop('disabled', true);

$("#deleteCustomer").on('shown.bs.modal', function () {
    $(this).find("#txtSearchCId").focus();
});

$("#btnDeleteCustomer").click(function () {
    let res = confirm("Do you want to delete this customer?");
    if (res) {
        deleteCustomer();
        loadAllCustomers();
    }
});

$("#btnClearDeleteCustomerFields").click(function () {
    $("#btnDeleteCustomer").prop('disabled', true);
    clearDeleteCustomerFields();
});

function clearDeleteCustomerFields() {
    $("#txtSearchCId").focus();

    $("#txtSearchCId").val("");
    $("#txtdcName").val("");
    $("#txtdcAddress").val("");
    $("#txtdcSalary").val("");

    $("#searchCustomerIdError").text("");
}

//Other

$("#searchCustomerForm").submit(function (e) {
    e.preventDefault();
});

$("#txtSCustId").on('keyup', function (event) {
    var custId = $("#txtSCustId").val();
    if (regCusId.test(custId)) {
        $("#txtSCustId").css('border', '2px solid green');
        if (event.key == "Enter") {
            searchCustomerByTable(custId);
        }
    } else {
        $("#txtSCustId").css('border', '2px solid red');
    }
});

$("#btnSearchCustId").click(function () {
    var custId = $("#txtSCustId").val();
    searchCustomerByTable(custId);
});

$("#btnClearSearchField").click(function () {
    $("#txtSCustId").val("");
    $("#txtSCustId").css('border', '1px solid #ced4da');
    loadAllCustomers();
});