/***************************************************************************
File Name       : Service.js
Purpose         : To encapsulate all the functions related to service call
***************************************************************************/
app.service("taskService", function ($http) {

    //get All Employee  
    this.getAllTasks = function () {
        return $http.get("/api/ItemAPI");
    };

    this.getTask = function (id) {
        var response = $http({
            method: "get",
            url: "/api/ItemAPI/" + id         
        });
        return response;

    };

    this.updateTask = function (task) {
        var response = $http({
            method: "put",
            url: "/api/ItemAPI/" + task.Id,
            data: (task)

        });
        return response;

    };

    this.addTask = function (task) {
        var response = $http({
            method: "post",
            url: "/api/ItemAPI",
            data: (task)

        });
        return response;

    };


    this.deleteTask = function (id) {
        var response = $http({
            method: "delete",
            url: "/api/ItemAPI/" + id
        });
        return response;
    }
}); 
