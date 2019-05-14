const container = document.getElementById('list-container')
const loader = document.getElementById('list-loading')

function loaderin() {
    loader.classList.remove('animated', 'fadeIn')
    loader.removeEventListener('animationend', loaderin)
}
loader.addEventListener('animationend', loaderin)

var rawDemos = [
    
    { link: 'demos/0.html', title: 'First Demo', desc: 'Test demo.' },
    { link: 'demos/1.html', title: 'Basic Text Editor', desc: 'A simple text editor made with JS.' }
    
]

var demos = []
for (var rawDemoId = rawDemos.length; rawDemoId > -1; rawDemoId--) {
    demos[Math.abs(rawDemos.length-rawDemoId-1)] = rawDemos[rawDemoId]
}

for (var demoId = 0; demoId < demos.length; demoId++) {
    if (demos[demoId] !== undefined) {
        document.getElementById('actual-list').innerHTML += `
        <div id="card-${demoId}" class="row border card-link-sm mt-4 mb-5 mx-5 py-3 px-4 bg-light rounded shadow-sm d-block" onclick="cardURL('${demoId}', '${demos[demoId].link}')">
            <h1 class="display-5 font-weight-light">${demos[demoId].title}</h1>
            <p class="lead my-2">${demos[demoId].desc}</p>
        </div>`
    }
}

setTimeout(function() {
    
    loader.classList.add('animated', 'fadeOut')
    
    function loaderout() {
        loader.classList.remove('animated', 'fadeOut')
        loader.classList.add('d-none')
        loader.removeEventListener('animationend', loaderout)
        container.classList.remove('d-none')
        container.classList.add('animated', 'fadeIn')
    }
    loader.addEventListener('animationend', loaderout)
    
}, 500)