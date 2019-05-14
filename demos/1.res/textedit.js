doNew()

function readFile(e) {
    
    var file = e.target.files[0]
    if (!file) return
    
    var reader = new FileReader()
    
    reader.onload = function(e) {
        var contents = e.target.result
        
        var fullPath = document.getElementById('file-input').value
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'))
            var filename = fullPath.substring(startIndex)
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) filename = filename.substring(1)
            rename(filename)
        }
        
        $('#text-box').val(contents)
    }
    reader.readAsText(file)
    
}

function download(filename, text) {
    
    var element = document.createElement('a')
    element.style.display = 'none'
    
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)
    
    document.body.appendChild(element)
    
    element.click()
    
    document.body.removeChild(element)
    
}

function doLoad() {
    document.getElementById("file-input").click()
}

function doSave() {
    download(currentfile, $('#text-box').val())
}

function doNew() {
    rename('untitled.txt')
    $('#text-box').val('')
}

function rename(newname) {
    currentfile = newname
    document.getElementById('file-name').innerHTML = currentfile
}

document.getElementById('file-input').addEventListener('change', readFile, false)