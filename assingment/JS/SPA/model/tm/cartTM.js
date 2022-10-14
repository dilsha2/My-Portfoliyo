function cartTM(itemCode, itemName, itemPrice, buyQty, total){
    var __itemCode = itemCode;
    var __itemName = itemName;
    var __itemPrice = itemPrice;
    var __buyQty = buyQty;
    var __total = total;

    this.getItemCode = function (){
        return __itemCode;
    }

    this.setItemCode = function (itemCode){
        __itemCode = itemCode;
    }

    this.geItemName = function (){
        return __itemName;
    }

    this.setItemName = function (itemName){
        __itemName = itemName;
    }

    this.getItemPrice = function (){
        return __itemPrice;
    }

    this.setItemPrice = function (itemPrice){
        __itemPrice = itemPrice;
    }

    this.getBuyQty = function (){
        return __buyQty;
    }

    this.setBuyQty = function (buyQty){
        __buyQty = buyQty
    }

    this.getTotal = function (){
        return __total;
    }

    this.setTotal = function (total){
        __total = total;
    }
}