const container = document.getElementById('list-container')
const loader = document.getElementById('list-loading')

function loaderin() {
    loader.classList.remove('animated', 'fadeIn')
    loader.removeEventListener('animationend', loaderin)
}
loader.addEventListener('animationend', loaderin)

var rawPosts = [
    
    { link: 'posts/0.html', title: 'Hello, World!', desc: 'Test post.' },
    { link: 'posts/1.html', title: 'First Real Post', desc: 'Since the site\'s been refreshed, I can now start blogging.' },
    { link: 'posts/2.html', title: 'Site Refresh', desc: 'After having an OK site for a while, it\'s time to restart.' },
    
]

var posts = []
for (var rawPostId = rawPosts.length; rawPostId > -1; rawPostId--) {
    posts[Math.abs(rawPosts.length-rawPostId-1)] = rawPosts[rawPostId]
}

document.getElementById('title-latest-0').innerHTML = posts[0].title
document.getElementById('desc-latest-0').innerHTML = posts[0].desc

document.getElementById('title-latest-1').innerHTML = posts[1].title
document.getElementById('desc-latest-1').innerHTML = posts[1].desc

for (var postId = 2; postId < posts.length; postId++) {
    document.getElementById('other-posts').innerHTML += `
    <div id="card-other-${postId}" class="row card-link-row rounded w-100 border-top mt-3 p-3 d-block" onclick="cardURL('other-${postId}', '${posts[postId].link}')">
        <h2 class="display-5 font-weight-light">${posts[postId].title}</h2>
        <p class="lead my-2">${posts[postId].desc}</p>
    </div>`
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