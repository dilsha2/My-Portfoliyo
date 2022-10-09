function ItemDTO(code, name,unitPrice, qty){
    var __code = code;
    var __name = name;
    var __unitPrice = unitPrice;
    var __qty = qty;

    this.getCode = function (){
        return __code;
    }

    this.setCode = function (code){
        __code = code;
    }

    this.getName = function (){
        return __name;
    }

    this.setName = function (name){
        __name = name;
    }

    this.getUnitPrice = function (){
        return __unitPrice;
    }

    this.setUnitPrice = function (unitPrice){
        __unitPrice = unitPrice;
    }

    this.getQty = function (){
        return __qty;
    }

    this.setQty = function (qty){
        __qty = qty;
    }
}