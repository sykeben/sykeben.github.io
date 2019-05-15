var words = [
    ['can\'t', 'am not able to can'],
    ['won\'t', 'will not'],
    ['don\'t', 'do not'],
    ['shouldn\'t', 'are unable to should'],
    ['throw', 'yeet with force'],
    ['toss', 'softly yeet'],
    ['yes', 'non\'t'],
    ['no', 'yesn\'t'],
    ['dead', 'liven\'t']
]

var startings = [ ' ', '"' ]
var endings = [ ' ', '.', ',', '!', '?', ':', '"' ]

function doUpdate() {
    output = $('#text-input').val()
    for (var i=0; i < words.length; i++) {
        for (var j=0; j < endings.length; j++) {
            for (var k=0; k < startings.length; k++) {
                var rx = new RegExp(`\\${startings[k]}${words[i][0]}\\${endings[j]}`, 'g')
                output = output.replace(rx, `${startings[k]}${words[i][1]}${endings[j]}`)
            }
        }
    }
    $('#text-output').val(output)
    setTimeout(doUpdate, 250)
}

doUpdate()