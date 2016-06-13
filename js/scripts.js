function ToDoTask(task, date) {
  this.task = task;
  this.date = date;
  this.completed = false;
};

ToDoTask.prototype.format=function() {
  if (!this.date ) {
    return this.task + "  ";
  } else {
    return this.task + "  due on  " + this.date;
  }
}

var dict = {};




var displayList = function(dict, type) {
  $("#toDoList").empty();
  var keys = Object.keys(dict);
  keys.sort(function(a,b) {
    var aValue = parseInt(dict[a].date.slice(0,4))*10000 + parseInt(dict[a].date.slice(5,7))*100 + parseInt(dict[a].date.slice(8,10));
    var bValue = parseInt(dict[b].date.slice(0,4))*10000 + parseInt(dict[b].date.slice(5,7))*100 + parseInt(dict[b].date.slice(8,10));
    if(aValue < bValue) {
      return -1;
    } else if (bValue < aValue) {
      return 1;
    } else {
      return 0;
    }
  });
  keys.forEach(function(key) {
    if(dict[key].completed===type) {
      if(!type) {
        $("#toDoList").append("<li>" + dict[key].format() + "<button type='button' class='btn btn-warning completedButton'>Completed!</button></li><hr>");
      } else {
        $("#toDoList").append("<li>" + dict[key].format() + "</li><hr>");
      }
    }
  });
}
$(document).ready(function() {

  $("#toDoForm").submit(function() {


    event.preventDefault();
    var inputtedTask = $("#task").val();
    var inputtedDate = $("#date").val();

    if (Object.keys(dict).indexOf(inputtedTask)!= -1 && inputtedTask != "") {
      $("#submitButton").removeClass("btn-primary");
      $("#submitButton").addClass("btn-danger");
      $("#helpBlock").removeClass("hidden");
    } else {
      $("#submitButton").addClass("btn-primary");
      $("#submitButton").removeClass("btn-danger");
      $("#helpBlock").addClass("hidden");
      var newToDoTask = new ToDoTask(inputtedTask, inputtedDate);

      dict[newToDoTask.task]=newToDoTask;
      if($("#openTasks").hasClass("hidden")) {
        displayList(dict, false);
        $("#toDoList h4").remove();
      }
      $("#task").val("");
    }

    $(".completedButton").click(function() {
      debugger;
      var liText = $(this).parent().text();
      dict[liText.slice(0, liText.search("  "))].completed = true;
      $(this).parent().next().remove();
      $(this).parent().remove();
      if($("#toDoList li").length===0) {
        $("#toDoList").append("<h4>No Tasks Here</h4>")
      }
    });
  });
  $("#completedTasks").click(function() {
    $("#openTasks").removeClass("hidden");
    $("#completedTasks").addClass("hidden");
    displayList(dict, true);
    if($("#toDoList li").length===0) {
      $("#toDoList").append("<h4>No Tasks Here</h4>")
    }
  });

  $("#openTasks").click(function() {
    $("#completedTasks").removeClass("hidden");
    $("#openTasks").addClass("hidden");
    displayList(dict, false);
    if($("#toDoList li").length===0) {
      $("#toDoList").append("<h4>No Tasks Here</h4>")
    }
  });

});
