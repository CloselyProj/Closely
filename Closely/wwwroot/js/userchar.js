"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/user").build();


var link = document.getElementById("sharedlink");
const group = link.value.split('?link=');


//Disable the send button until connection is established.

connection.start().then(function () {
    
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

//Вызывается при загрузке документа
window.onload = function () {
    connection.invoke("Enter", group[1]).catch(function (err) {
        return console.error(err.toString());
    });
};

connection.on("Notify", function (message, userName) {
    document.getElementById('textForm').value = document.getElementById('textForm').value + `${message}`;

});


connection.on("Receive", function (message, userName) {
    document.getElementById('textForm').value = document.getElementById('textForm').value + `${message}`;

});


document.getElementById("sendButton").addEventListener("click", function (e) {
    var message = document.getElementById("messageInput").value;
    connection.invoke("Send", message, group[1]).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});