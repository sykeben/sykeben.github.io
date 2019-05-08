function cardURL(id, newURL) {
    $(`#card-${id}`).removeClass(['animated', 'zoomIn', 'faster', 'fadeInLeft', 'fadeInRight', 'delay-0p25s', 'delay-0p5s', 'delay-0p75s', 'delay-1s', 'delay-1p25s', 'delay-1p5s', 'delay-1p75s', 'delay-2s'])
    $(`#card-${id}`).addClass(['animated', 'pulse', 'faster'])
    setTimeout(function() { window.location.href = newURL }, 250)
}