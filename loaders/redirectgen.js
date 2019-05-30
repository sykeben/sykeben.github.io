// CLIPBOARD.JS SETUP

var clipjs = new ClipboardJS('.btn')

clipjs.on('success', function(e) {
    setTimeout(e.clearSelection, 100)
})



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