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
        success: function() {
            window.location.href = "/admin";
        },
        error: function(e) {
            document.getElementById("error").innerHTML = e.responseText;
        }
    });
}