
$(document).on("keyup", "#timkiem", function () {
    var data = $(this).val();
    // console.log("dl: " + data)
    if (data !== "") {
        $.ajax({
            async: false,
            type: "POST",
            url: '/',
            datatype: "html",
            contentType: "application/x-www-form-urlencoded",
            data: { data: data },
            success: function (response) {
                // console.log(response);
                $("#listsearch").html(response.html);
            }, error: function (xhr, ajaxOption, throwError) {
                alert("xay ra loi");
            }
        })
    } else {
        $.ajax({
            async: false,
            type: "POST",
            url: '/',
            datatype: "html",
            contentType: "application/x-www-form-urlencoded",
            data: { data: data },
            success: function (response) {
                // console.log(response);
                $("#listsearch").html(``);
            }, error: function (xhr, ajaxOption, throwError) {
                alert("xay ra loi");
            }
        })
    }
})
$(document).on("onclick", ".modal-content", function () {
    var data = $(this).val();
    $.ajax({
        async: false,
        type: "POST",
        url: '/chitietphim/:id',
        datatype: "html",
        contentType: "application/x-www-form-urlencoded",
        data: { data: data },
        success: function (response) {
            // console.log(response);
            $("#listsearch").html(response.html);
        }, error: function (xhr, ajaxOption, throwError) {
            alert("xay ra loi");
        }
    })
}
)

