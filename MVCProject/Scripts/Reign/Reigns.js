//Load Data in Reigns Table when documents is ready
$(document).ready(function () {
    loadData();
});
//Load Data function
function loadData() {
    $.ajax({
        url: "/ReignAll/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.ReignsId + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.ReignsId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.ReignsId + ')">Delete</a></td>';
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
        ReignsId: $('#ReignsId').val(),
        Name: $('#Name').val()
    };
    $.ajax({
        url: "/ReignAll/Add",
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
function getbyID(ReignsId) {
    $('#RoleName').css('border-color', 'lightgrey');
    $.ajax({
        url: "/ReignAll/getbyID/" + ReignsId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#ReignsId').val(result.ReignsId);
            $('#Name').val(result.Name);
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
        ReignsId: $('#ReignsId').val(),
        Name: $('#Name').val()
    };
    $.ajax({
        url: "/ReignAll/Update",
        data: JSON.stringify(rolObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#ReignsId').val(0);
            $('#Name').val("");
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
            url: "/ReignAll/Delete/" + ID,
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
    $('#ReignsId').val(0);
    $('#Name').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    return isValid;
}