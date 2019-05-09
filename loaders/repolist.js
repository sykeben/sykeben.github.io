const container = document.getElementById('list-container')
const loader = document.getElementById('list-loading')

function loaderin() {
    loader.classList.remove('animated', 'fadeIn')
    loader.removeEventListener('animationend', loaderin)
}
loader.addEventListener('animationend', loaderin)

$.getJSON('https://api.github.com/users/sykeben/repos', function(json) {
    
    var repo = []
    for (var repoid = 0; repoid < json.length; repoid++) {
        
        repo = json[repoid]
        
        var description = repo.description
        if (repo.description == null) description = '<em>No Description.</em>'
        
        var lastupdated = new Date(repo.updated_at);
        
        container.innerHTML += `
        <div class="row">
            <div id="card-${repo.id}" class="col card-link-sm my-4 mx-lg-5 px-4 pt-4 pb-3 border bg-light rounded shadow-sm" onclick="cardURL('${repo.id}', '${repo.html_url.toString()}')">

                <h2 class="display-5 font-weight-light">${repo.name}</h2>
                <p class="lead mb-2">${description}</p>

                <div class="font-weight-lighter row mb-2 pb-1">
                    <div class="col-md-auto mr-md-n3">Updated ${lastupdated.toLocaleString()}</div>
                    <div class="col-md-auto mr-md-n3">${repo.stargazers_count} Stars, ${repo.forks} Forks</div>
                </div>

            </div>
        </div>`
        
    }
    
})

setTimeout(function() {
    
    loader.classList.add('animated', 'fadeOut')
    
    function loaderout() {
        loader.classList.remove('animated', 'fadeOut')
        loader.classList.add('d-none')
        loader.removeEventListener('animationend', loaderout)
        container.classList.remove('d-none')
        container.classList.add('animated', 'fadeInLeft')
    }
    loader.addEventListener('animationend', loaderout)
    
}, 500)