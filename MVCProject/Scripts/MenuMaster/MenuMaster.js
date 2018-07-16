//Load Data in Menu Master Table when documents is ready
$(document).ready(function () {
    loadData();
});
//Load Data function
function loadData() {
    $.ajax({
        url: "/MenuMasterAll/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.MenuId + '</td>';
                html += '<td>' + item.MenuName + '</td>';
                html += '<td>' + item.MenuUrl + '</td>';
                html += '<td>' + item.MenuParentId + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.MenuId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.MenuId + ')">Delete</a></td>';
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
    var res = validate();
    if (res == false) {
        return false;
    }
    var menuObj = {
        MenuId: $('#MenuId').val(),
        MenuName: $('#MenuName').val(),
        MenuUrl: $('#MenuUrl').val(),
        MenuParentId: $('#MenuParentId').val()

    };
    $.ajax({
        url: "/MenuMasterAll/Add",
        data: JSON.stringify(menuObj),
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
function getbyID(MenuId) {
    $('#MenuName').css('border-color', 'lightgrey');
    $('#MenuUrl').css('border-color', 'lightgrey');
    $('#MenuParentId').css('border-color', 'lightgrey');
    $.ajax({
        url: "/MenuMasterAll/getbyID/" + MenuId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#MenuId').val(result.MenuId);
            $('#MenuName').val(result.MenuName);
            $('#MenuUrl').val(result.MenuUrl);
            $('#MenuParentId').val(result.MenuParentId);
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
    var menuObj = {
        MenuId: $('#MenuId').val(),
        MenuName: $('#MenuName').val(),
        MenuUrl: $('#MenuUrl').val(),
        MenuParentId: $('#MenuParentId').val()
    };
    $.ajax({
        url: "/MenuMasterAll/Update",
        data: JSON.stringify(menuObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#MenuId').val(0);
            $('#MenuName').val("");
            $('#MenuUrl').val("");
            $('#MenuParentId').val("");
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
            url: "/MenuMasterAll/Delete/" + ID,
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
    $('#MenuId').val(0);
    $('#MenuName').val("");
    $('#MenuUrl').val("");
    $('#MenuParentId').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#MenuName').css('border-color', 'lightgrey');
    $('#MenuUrl').css('border-color', 'lightgrey');
    $('#MenuParentId').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#MenuName').val().trim() == "") {
        $('#MenuName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#MenuName').css('border-color', 'lightgrey');
    }
    if ($('#MenuUrl').val().trim() == "") {
        $('#MenuUrl').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#MenuUrl').css('border-color', 'lightgrey');
    }
    if ($('#MenuParentId').val().trim() == "") {
        $('#MenuParentId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#MenuParentId').css('border-color', 'lightgrey');
    }
    return isValid;
}