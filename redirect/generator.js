// CLIPBOARD.JS SETUP

var clipjs = new ClipboardJS('.btn')

clipjs.on('success', function(e) {
    setTimeout(e.clearSelection, 100)
})



// LATEST RELEASE FILE

function lrfGen() {
    var user = $('#lrf-user').val() || '[user]'
    var repo = $('#lrf-repo').val() || '[repo]'
    var file = $('#lrf-file').val() || '[file]'
    $('#lrf-out').text(`https://sykeben.github.io/redirect/latestdl.html?user=${user}&repo=${repo}&file=${file}`)
}

$('#lrf-user').on('keyup', lrfGen)
$('#lrf-repo').on('keyup', lrfGen)
$('#lrf-file').on('keyup', lrfGen)

lrfGen()