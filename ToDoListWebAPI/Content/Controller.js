/********************************************************************
File Name   : Controller.js
Purpose     : To encapsulate all the functions related to Controller 

/********************************************************************/
app.controller("taskCntrl", function ($scope, taskService) {

    //Get all the tasks available in the DB on load
    GetAllTasks();
    $scope.regex = /^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./1-9]*$/;
    //For sorting according to columns  
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }

    //To Get All Records  
    function GetAllTasks() {
        var getData = taskService.getAllTasks();

        getData.then(function (task) {
            $scope.tasks = task.data;
        }, function (task) {
            alert("Load failed!");
        });
    }

    //Set the Add action param and clear the fields for Add mode
    $scope.AddTaskDiv = function () {
        ClearFields();
        $scope.Action = "Add";        
    }

    // --Alert Popup for save , update messages . -->
    $scope.alertmsg = function () {
        $("#alertModal").modal('hide');
    };


    //-- Get the Task By ID. -->
    $scope.editTask = function (task) {
        var getData = taskService.getTask(task.Id);
        getData.then(function (taskitem) {
            $scope.task = taskitem.data;
            $scope.Id = task.Id;
            $scope.Details = task.sText;
            $scope.DueDate = new Date(task.dtDueDate);
            $scope.Priority = task.sPriority;
            $scope.Complete = task.bComplete;
            //Set the mode as Edit to enable update of the task
            $scope.Action = "Edit";
            
        },
            function (msg) {
                $("#alertModal").modal('show');
                $scope.msg = msg.data;
            });
    }

    //- Insertion and updation code. -->  
    $scope.AddUpdateTask = function () {
        var Task = {
            sText: $scope.Details,
            dtDueDate: $scope.DueDate,
            sPriority: $scope.Priority,
            bComplete: $scope.Complete
        };
        
        var getAction = $scope.Action;

        if (getAction == "Edit") {
            Task.Id = $scope.Id;
            var getData = taskService.updateTask(Task);
            getData.then(function (msg) {
                GetAllTasks();
                ClearFields();
                $("#alertModal").modal('show');
                $scope.msg = "Successfully Updated.";
            }, function (msg) {
                $("#alertModal").modal('show');
                $scope.msg = msg.data;
            });
        }
        else {
            var getData = taskService.addTask(Task);
            getData.then(function (msg) {
                GetAllTasks();
                $("#alertModal").modal('show');
                $scope.msg = "Successfully Added.";
                ClearFields();

            }, function (msg) {
                $("#alertModal").modal('show');
                $scope.msg = msg.data;
            });
        }

        GetAllTasks();
        $scope.refresh();
    };

    //Delete the task based on Id passed
    $scope.deleteTask = function (task) {
        var getData = taskService.deleteTask(task.Id);
        getData.then(function (msg) {
            GetAllTasks();
            $("#alertModal").modal('show');
            $scope.msg = "Successfully Deleted.";
            
        }, function (msg) {
            $("#alertModal").modal('show');
            $scope.msg = msg.data;
        });

    };

    //-Clear fields after save -- >
    function ClearFields() {
        $scope.Id = 0;
        $scope.Details = "";
        $scope.DueDate = new Date();
        $scope.Priority = "Low";
        $scope.Complete = false;
        $scope.Action = "Add";
    }
});   



app.directive('taskDirective', function () {
    function link(scope, elem, attrs, ngModel) {
        ngModel.$parsers.push(function (viewValue) {
            var reg = /^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./1-9]*$/;
            // if view values matches regexp, update model value
            if (viewValue.match(reg)) {
                return viewValue;
            }
            // keep the model value as it is
            var transformedValue = ngModel.$modelValue;
            ngModel.$setViewValue(transformedValue);
            ngModel.$render();
            return transformedValue;
        });
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: link
    };
});

