app.controller("taskController",function ($scope, taskService) {
    var self = $scope;
    self.listTodo = taskService.allTask("listTodo") || [];
    self.listOnGoing = taskService.allTask("listOnGoing") || [];
    self.listReview = taskService.allTask("listReview") || [];
    self.listDone = taskService.allTask("listDone") || [];

    self.saveTask = function (task) {
        if(task.state === "TODO") {
            self.listTodo.push(task);
            self.listTodo = taskService.saveTask("listTodo", self.listTodo);
        } else if (task.state === "ON_GOING"){
            self.listOnGoing.push(task);
            self.listOnGoing = taskService.saveTask("listOnGoing",self.listOnGoing);
        } else if (task.state === "REVIEW"){
            self.listReview.push(task);
            self.listOnGoing = taskService.saveTask("listReview", self.listReview);
        } else if (task.state === "DONE"){
            self.listDone.push(task);
            self.listOnGoing = taskService.saveTask("listDone", self.listDone);
        }

        self.toast("toast","Task saved successfully!");
        dialog.close();
        location.reload();
    };

    self.deleteTask = function (task, index) {
        if(task.state === "TODO") {
            taskService.deleteTask("listTodo", index, self.listTodo);
        } else if (task.state === "ON_GOING"){
            taskService.deleteTask("listOnGoing", index, self.listOnGoing);
        } else if (task.state === "REVIEW"){
            taskService.deleteTask("listReview", index, self.listReview);
        } else if (task.state === "DONE"){
            taskService.deleteTask("listDone", index, self.listDone);
        }
        self.toast("toast","Task deleted successfully!");
        location.reload();
    };

    self.toast = function (name, message) {
        var snackbarContainer = document.querySelector('#' + name);
        var data = {
            message: message
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    };
});