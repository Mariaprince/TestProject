//Load Data in Role Table when documents is ready
$(document).ready(function () {
    loadData();
});
//Load Data function
function loadData() {
    $.ajax({
        url: "/RoleMaster/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.RoleId + '</td>';
                html += '<td>' + item.RoleName + '</td>';
                html += '<td>' + item.IsActive + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.RoleId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.RoleId + ')">Delete</a></td>';
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
    var rolObj = {
        RoleId: $('#RoleId').val(),
        RoleName: $('#RoleName').val(),
        IsActive: $('#IsActive').is(":checked")
    };
    $.ajax({
        url: "/RoleMaster/Add",
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
function getbyID(RoleId) {
    $('#RoleName').css('border-color', 'lightgrey');
    $.ajax({
        url: "/RoleMaster/getbyID/" + RoleId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#RoleId').val(result.RoleId);
            $('#RoleName').val(result.RoleName);
            if (result.IsActive)
            {
                $('#IsActive').prop('checked', true);
            }
            else
            {
                $('#IsActive').prop('checked', false);
            }
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
    var rolObj = {
        RoleId: $('#RoleId').val(),
        RoleName: $('#RoleName').val(),
        IsActive: $('#IsActive').is(":checked"),
    };
    $.ajax({
        url: "/RoleMaster/Update",
        data: JSON.stringify(rolObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#RoleId').val(0);
            $('#RoleName').val("");
            $('#IsActive').prop('checked', false);
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
            url: "/RoleMaster/Delete/" + ID,
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
    $('#RoleId').val(0);
    $('#RoleName').val("");
    $('#IsActive').prop('checked', false);
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#RoleName').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#RoleName').val().trim() == "") {
        $('#RoleName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#RoleName').css('border-color', 'lightgrey');
    }
    return isValid;
}