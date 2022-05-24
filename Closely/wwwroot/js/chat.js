"use strict";

// Получим наш объект "соединение"
var connection = new signalR.HubConnectionBuilder().withUrl("/user").build();

// Кнопка будет неактивная, до тех пор, пока нет соединения.
document.getElementById("sendButton").disabled = true;

// Навешиваем событие click на элемент с id = "sendButton"
// Т.е. когда мы кликаем по кнопке, то запускается наша функция обраного вызова.
document.getElementById("sendButton").addEventListener("click", function (event) {
    // Берем тексты из контролов <input />
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    // Тут черзе объект connection фактически запускаем метод "SendMessage" на сервере, 
    // который в свою очередь с сервера оповестит всех подписчиков методом "ReceiveMessage".
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });

    event.preventDefault();
});

// Подписываемся к событию "ReceiveMessage". 
// Данное событие запускается на сервере (в коде c# это метод "ReceiveMessage"), а js "слушает его"
connection.on("ReceiveMessage", function (user, message) {
    // Как только событие отработает запуститься наша функция обратного вызова callback function
    var msg = message.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

// Запускаем соединение асинхронно.
connection.start().then(function () {
    // Если соединение успешное установлено, то активируем кнопку
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    // Если соединение не удалось
    return console.error(err.toString());
});