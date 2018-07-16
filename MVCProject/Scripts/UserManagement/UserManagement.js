//Load Data in User Management Table when documents is ready
$(document).ready(function () {
    loadData();
});
//Load Data function
function loadData() {
    $.ajax({
        url: "/UserManagementsAll/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.UId + '</td>';
                html += '<td>' + item.UserName + '</td>';
                html += '<td>' + item.UserPassword + '</td>';
                html += '<td>' + item.UserEmail + '</td>';
                html += '<td>' + item.RoleName + '</td>';
                html += '<td>' + item.ReignName + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.UId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.UId + ')">Delete</a></td>';
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
    var umanObj = {
        UId: $('#UId').val(),
        UserName: $('#UserName').val(),
        UserPassword: $('#UserPassword').val(),
        UserEmail: $('#UserEmail').val(),
        UserRoleId: $('#UserRoleId').val(),
        UserReignsId: $('#UserReignsId').val()
    };
    $.ajax({
        url: "/UserManagementsAll/Add",
        data: JSON.stringify(umanObj),
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
function getbyID(ReignsId) {
    $('#RoleName').css('border-color', 'lightgrey');
    $.ajax({
        url: "/UserManagementsAll/getbyID/" + ReignsId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#UId').val(result.UId);
            $('#UserName').val(result.UserName);
            $('#UserPassword').val(result.UserPassword);
            $('#UserEmail').val(result.UserEmail);
            $('#UserRoleId').val(result.UserRoleId);
            $('#UserReignsId').val(result.UserReignsId);
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
    var umanObj = {
        UId: $('#UId').val(),
        UserName: $('#UserName').val(),
        UserPassword: $('#UserPassword').val(),
        UserEmail: $('#UserEmail').val(),
        UserRoleId: $('#UserRoleId').val(),
        UserReignsId: $('#UserReignsId').val()

    };
    $.ajax({
        url: "/UserManagementsAll/Update",
        data: JSON.stringify(umanObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#UId').val(0);
            $('#UserName').val("");
            $('#UserPassword').val("");
            $('#UserRoleId').val(0);
            $('#UserReignsId').val(0);
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
            url: "/UserManagementsAll/Delete/" + ID,
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
    $('#UId').val(0);
    $('#UserName').val("");
    $('#UserPassword').val("");
    $('#UserEmail').val("");
    $('#UserRoleId').val(0);
    $('#UserReignsId').val(0);
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#UserName').val().trim() == "") {
        $('#UserName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#UserName').css('border-color', 'lightgrey');
    }
    if ($('#UserPassword').val().trim() == "") {
        $('#UserPassword').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#UserPassword').css('border-color', 'lightgrey');
    }
    if ($('#UserEmail').val().trim() == "") {
        $('#UserEmail').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#UserEmail').css('border-color', 'lightgrey');
    }
    if ($('#UserRoleId').val().trim() == "") {
        $('#UserRoleId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#UserRoleId').css('border-color', 'lightgrey');
    }
    if ($('#UserReignsId').val().trim() == "") {
        $('#UserReignsId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#UserReignsId').css('border-color', 'lightgrey');
    }
    return isValid;
}