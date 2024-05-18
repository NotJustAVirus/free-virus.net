function submit() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    $.ajax({
        type: "POST",
        url: "login.php",
        data: {
            username: username,
            password: password
        },
        success: function(e) {
            if (e == "success") {
                window.location.href = "/admin";
            } else {
                document.getElementById("error").innerHTML = "Unknown error. Please try again.";
            }
        },
        error: function(e) {
            document.getElementById("error").innerHTML = e.responseText;
        }
    });
}