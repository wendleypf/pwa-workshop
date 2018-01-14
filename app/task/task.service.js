app.service("taskService", function () {

    function _saveTask(item,listTask) {
        return localStorage.setItem(item, JSON.stringify(listTask));
    }

    function _allTask(type) {
        return JSON.parse(localStorage.getItem(type));
    }

    function _deleteTask(item,index, listTask) {
        listTask.splice(index, 1);
        localStorage.setItem(item, JSON.stringify(listTask));
    }

    return {
        saveTask: _saveTask,
        allTask: _allTask,
        deleteTask: _deleteTask
    }
});