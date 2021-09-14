function habilitarFechaEntrega(event) {
    $("#fecha").attr("disabled", !$("#programado").prop("checked"));
}

$("#programado").click(function (e) { 
    habilitarFechaEntrega(e);
});
$("#antes").click(function (e) { 
    habilitarFechaEntrega(e);
});
$("#fecha").val(new Date().toJSON().slice(0,19));