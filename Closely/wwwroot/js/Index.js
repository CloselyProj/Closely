const UserBtn = document.getElementById("UserBtn");
if (document.cookie["Login"] == "true") {
    UserBtn.value = "Welcome!";
}

