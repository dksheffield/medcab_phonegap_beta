// Startup functions
function onBodyLoad() {
    document.addEventListener("deviceready",onDeviceReady, false);
}
function onDeviceReady() {
    showDiv('loading_div');
    if (isSessionActive()) {
        console.log('User is logged in');
        showDiv('loading_div');
    } else {
        showCorrectLoginDiv();   
    }
    $('#uuid').html(device.uuid);
    //setInterval(function(){ajaxOnlineCheck()}, 30000);
}

//regualr application functions
function ajaxOnlineCheck() {
    console.log('Checking if we are online...');
    var jqxhr = $.get( "http://www.google.com", function() {
        var isOnline = true;
    })
    .fail(function() {
        var isOnline = false;
    })
    .always(function() {
        console.log('Are we online? ' + isOnline);
        return isOnline;
    });
}
function clearStorage() {
    console.log('clearing storage');   
}
function hideAllDivs() {
    var divs = ['offline_div','janrain_login_div','loading_div',
        'pincode_login_div'];
    for (x=0;x<divs.length;x++) {
        $('#' + divs[x]).removeAttr('style');
        $('#' + divs[x]).attr('style','display: none;');
    }
}
function isSessionActive() {
    var sessionActive = false;
    if (window.sessionStorage.getItem("sessionExpireDate") === null) {
        console.log('no session object named sessionExpireDate');
    } else {
        console.log('There is a session named sessionExpireDate');   
    }
    return sessionActive;
}
function showCorrectLoginDiv() {
    if (window.localStorage.getItem("userPinCode") === null) {
        showDiv('janrain_login_div');
    } else {
        showDiv('pincode_login_div');   
    }
}
function showDiv(divName) {
    hideAllDivs();
    $('#' + divName).removeAttr('style');
    //call backs for divs
    if (divName !== 'offline_div') {
        if (!ajaxOnlineCheck()) {
            showDiv('offline_div');
        }
    }
}
function toggleStatus(prev_status,new_status) {
    if (prev_status !== new_status) {
        $('#local_storage_div').attr('data-network-status',new_status);
        if (new_status == 'online') {
            $('#offline_div').removeAttr('style');
            $('#offline_div').attr('style','display: none;');
            $('#online_div').removeAttr('style');
        } else {
            $('#offline_div').removeAttr('style');
            $('#online_div').removeAttr('style');
            $('#online_div').attr('style','display: none;');
        }
    }
}