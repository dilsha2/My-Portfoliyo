function OrderDetailsDTO(orderId, itemCode, name, unitPrice, buyQty, total) {
    var __orderId = orderId;
    var __itemCode = itemCode;
    var __itemName = name;
    var __unitPrice = unitPrice;
    var __buyQty = buyQty;
    var __total = total;

    this.getOrderId = function () {
        return __orderId;
    }

    this.setOrderId = function (orderId) {
        __orderId = orderId;
    }

    this.getItemCode = function () {
        return __itemCode;
    }

    this.setItemCode = function (itemCode) {
        __itemCode = itemCode;
    }

    this.getItemName = function () {
        return __itemName;
    }

    this.setItemName = function (itemName) {
        __itemName = itemName;
    }

    this.getUnitPrice = function () {
        return __unitPrice;
    }

    this.setUnitPrice = function (unitPrice) {
        __unitPrice = unitPrice;
    }

    this.getBuyQty = function () {
        return __buyQty;
    }

    this.setBuyQty = function (buyQty) {
        __buyQty = buyQty;
    }

    this.getTotal = function () {
        return __total;
    }

    this.setTotal = function (total) {
        __total = total;
    }
}