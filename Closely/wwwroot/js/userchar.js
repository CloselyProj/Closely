"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/user").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;
var link = document.getElementById("sharedlink");
const group = link.value.split('?link=');

connection.start().then(function () {
    
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

window.onload = function () {
    connection.invoke("Enter", group[1]).catch(function (err) {
        return console.error(err.toString());
    });
};
connection.on("Notify", function (message, userName) {
    document.getElementById('textForm').value = document.getElementById('textForm').value + `${message}`;

});


connection.on("Receive", function (message, userName) {

    //// создаем элемент <b> для имени пользователя
    //let userNameElem = document.createElement("b");
    //userNameElem.appendChild(document.createTextNode(userName + ": "));

    //// создает элемент <p> для сообщения пользователя
    //let elem = document.createElement("p");
    //elem.appendChild(userNameElem);
    //elem.appendChild(document.createTextNode(message));

    //var firstElem = document.getElementById("chatroom").firstChild;
    //document.getElementById("chatroom").insertBefore(elem, firstElem);



    document.getElementById('textForm').value = document.getElementById('textForm').value + `${message}`;

});


document.getElementById("sendButton").addEventListener("click", function (e) {
    //let message = document.getElementById("message").value;
    //hubConnection.invoke("Send", message, userName);

    var message = document.getElementById("messageInput").value;
    connection.invoke("Send", message, group[1]).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});