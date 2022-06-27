﻿"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/user").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("Send", function (message) {
    document.getElementById('textForm').value = document.getElementById('textForm').value + `${message}`;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var message = document.getElementById("messageInput").value;
    connection.invoke("Send", message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});