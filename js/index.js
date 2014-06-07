// Startup functions
function onBodyLoad() {
    document.addEventListener("deviceready",onDeviceReady, false);
}
function onDeviceReady() {
    isSessionActive();
    showDiv('loading_div');
    $('#uuid').html(device.uuid);
    //setInterval(function(){ajaxOnlineCheck()}, 30000);
}
function ajaxOnlineCheck() {
    var html = $('#debug_div').html();
    html += '<hr />';
    html += 'Checking via ajax<br />';
    var prev_status = $('#local_storage_div').attr('data-network-status');
    html += 'Prev status: ' + prev_status + '<br />';
    var jqxhr = $.get( "http://www.google.com", function() {
        html += 'new_status is online<br />';
        var new_status = 'online';
        toggleStatus(prev_status,new_status);
        $('#debug_div').html(html);
    })
    .fail(function() {
        html += 'new status is offline<br />';
        var new_status = 'offline';
        toggleStatus(prev_status,new_status);
        $('#debug_div').html(html);
    });
  
}
function clearStorage() {
    console.log('clearing storage');   
}
function hideAllDivs() {
    var divs = ['offline_div','janrain_login_div','loading_div'];
    for (x=0;x<divs.length;x++) {
        $('#' + divs[x]).removeAttr('style');
        $('#' + divs[x]).attr('style','display: none;');
    }
}
function isSessionActive() {
    if (window.sessionStorage.getItem("sessionExpireDate") === null) {
        console.log('no session object named sessionExpireDate');
    }
}
function showDiv(divName) {
    console.log(window.sessionStorage);
    console.log(window.localStorage);
    isSessionActive();
    hideAllDivs();
    $('#' + divName).removeAttr('style');          
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