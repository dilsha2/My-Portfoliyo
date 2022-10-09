function CustomerDTO(id, name, address, salary){
    var __id = id;
    var __name = name;
    var __address = address;
    var __salary = salary;

    this.getId = function(){
        return __id;
    }

    this.setId = function (id){
        __id = id;
    }

    this.getName = function (){
        return __name;
    }

    this.setName = function (name){
        __name = name;
    }

    this.getAddress = function (){
        return __address;
    }

    this.setAddress = function (address){
        __address = address;
    }

    this.getSalary = function (){
        return __salary;
    }

    this.setSalary = function (salary){
        __salary = salary;
    }
}