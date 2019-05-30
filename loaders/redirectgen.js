// "COPY" BUTTON SETUP

var copybtns = new ClipboardJS('.btn-copy')

copybtns.on('success', function(e) {
    setTimeout(e.clearSelection, 100)
})



// "TRY IT" BUTTON SETUP

var tryitbtns = document.getElementsByClassName('btn-tryit')

for (var i=0; i<tryitbtns.length; i++) {
    if (tryitbtns[i].getAttribute('data-tryit-target') !== null) {
        tryitbtns[i].addEventListener('click', function(e) {
            window.open($(this.getAttribute('data-tryit-target')).text(), '_blank')
        })
    }
}



// LATEST RELEASE FILE

function lrfGen() {
    var user = encodeURIComponent($('#lrf-user').val()) || 'null'
    var repo = encodeURIComponent($('#lrf-repo').val()) || 'null'
    var file = encodeURIComponent($('#lrf-file').val()) || 'null'
    $('#lrf-out').text(`https://sykeben.github.io/redirect/latestdl.html?user=${user}&repo=${repo}&file=${file}`)
}

$('#lrf-user').on('keyup', lrfGen)
$('#lrf-repo').on('keyup', lrfGen)
$('#lrf-file').on('keyup', lrfGen)

lrfGen()