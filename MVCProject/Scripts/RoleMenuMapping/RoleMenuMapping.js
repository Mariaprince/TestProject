//Load Data in Role Menu Mapping Table when documents is ready
$(document).ready(function () {
    loadData();
});
//Load Data function
function loadData() {
    $.ajax({
        url: "/RoleMenuMapping/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.RMId + '</td>';
                html += '<td>' + item.RoleName + '</td>';
                html += '<td>' + item.MenuId + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.RMId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.RMId + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Add Data Function
function Add() {
    //var selected = $("[id*=MenuIds] option:selected");
    //alert(selected);
    var res = validate();
    if (res == false) {
        return false;
    }
    var selected = $(".listbox").val();
    $('#MenuId').val(selected);
    var rolObj = {
        RMId: $('#RMId').val(),
        RoleId: $('#RoleId').val(),
        MenuId: $('#MenuId').val()
    };
    $.ajax({
        url: "/RoleMenuMapping/Add",
        data: JSON.stringify(rolObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon Employee ID
function getbyID(RMId) {
    $('#RoleId').css('border-color', 'lightgrey');
    $('#MenuIds').css('border-color', 'lightgrey');
    $.ajax({
        url: "/RoleMenuMapping/getbyID/" + RMId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#RMId').val(result.RMId);
            $('#RoleId').val(result.RoleId);
            $('#MenuIds').val(result.MenuIds);
            $('#MenuId').val(result.MenuId);
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
//function for updating employee's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var selected = $(".listbox").val();
    $('#MenuId').val(selected);
    var rolObj = {
        RMId: $('#RMId').val(),
        RoleId: $('#RoleId').val(),
        MenuId: $('#MenuId').val()
    };
    $.ajax({
        url: "/RoleMenuMapping/Update",
        data: JSON.stringify(rolObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#RoleId').val(0);
            $('#MenuIds').val(0);
            $('#MenuId').val();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/RoleMenuMapping/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
//Function for clearing the textboxes
function clearTextBox() {
    $('#RMId').val(0);
    $('#RoleId').val(0);
    $('#MenuIds').val(0);
    $('#btnUpdate').hide();
    $('#MenuId').val();
    $('#btnAdd').show();
    $('#RoleName').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#RoleId').val().trim() == 0) {
        $('#RoleId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#RoleId').css('border-color', 'lightgrey');
    }
    if ($(".listbox").val() == null) {
        $('#MenuIds').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#MenuIds').css('border-color', 'lightgrey');
    }
    return isValid;
}