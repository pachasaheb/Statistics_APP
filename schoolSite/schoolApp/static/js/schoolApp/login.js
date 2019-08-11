var path = location.hostname;

$(document).ready(function () {
    $("#username").val('');
    $("#password").val('');
});


login = function () {
    $.ajax({
        url: 'loginVerify/',
        type: 'post',
        dataType: 'json',
        data: JSON.stringify({ 'username': $("#username").val(), 'password': $("#password").val(), 'allowed_ip':path }),
        success: function (data) {
            if (data.success == true) {
                window.location='/statistics/class/';
            } else {
                alert("Please check Username/Passowrd/Allowed_IP");
            }
        }
    });
}