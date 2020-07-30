$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos);

    $("#todoInput").keypress(function(event){
        if(event.which==13){
            createTodo();
        }
    });

    $(".list").on("click", "span", function(e){
        e.stopPropagation();
        removeTodo($(this).parent());
    });

    $('.list').on("click", 'li', function(){
        updateTodo($(this));
    })
});

function addTodo(todo){
    var newTodo= $('<li>'+todo.name+'<span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    newTodo.addClass("task");
    if(todo.completed){
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}

function addTodos(todos){
    todos.forEach(function(todo){
       addTodo(todo);
    });
}

function createTodo(){
    var userInput=$("#todoInput").val();
    $.post("/api/todos", {name: userInput})
    .then(function(newTodo, textStatus, xhr){
        if(xhr.status==201){
            addTodo(newTodo);
            $("#todoInput").val("");
        } 
    })
    .catch(function(err){
        console.log(err);
    })
}

function removeTodo(todo){
    var clickedId=todo.data('id');
        $.ajax({
            method: "DELETE",
            url: "/api/todos/"+clickedId
        })
        .then(function(data){
            todo.remove();
        })
        .catch(function(err){
            console.log(err);
        })
}

function updateTodo(todo){
    var isDone=!todo.data("completed");
    var updateData={completed:isDone};
    $.ajax({
        method: "PUT",
        url: "/api/todos/"+todo.data('id'),
        data:updateData
    })
    .then(function(updatedtodo){
        todo.toggleClass('done');
        todo.data('completed', isDone);
        console.log(updatedtodo.completed)
    })
}