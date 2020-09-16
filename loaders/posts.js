const container = document.getElementById('list-container')
const loader = document.getElementById('list-loading')

function loaderin() {
    loader.classList.remove('animated', 'fadeIn')
    loader.removeEventListener('animationend', loaderin)
}
loader.addEventListener('animationend', loaderin)

var rawPosts = [
    
    { link: 'posts/0.html', date: '5/7/19', title: 'Hello, World!', desc: 'Test post.' },
    { link: 'posts/1.html', date: '5/8/19', title: 'First Real Post', desc: 'Since the site\'s been refreshed, I can now start blogging.' },
    { link: 'posts/2.html', date: '5/8/19', title: 'Site Refresh', desc: 'After having an OK site for a while, it\'s time to restart.' },
    { link: 'posts/3.html', date: '5/13/19', title: 'Dev for Hire', desc: 'Finally wrote my resume! Now I\'m looking for a summer job!'},
    { link: 'posts/4.html', date: '5/16/19', title: 'Project Publicity', desc: 'RasDash has been featured on the Open Source Developer Podcast!'},
    { link: 'posts/5.html', date: '5/31/19', title: 'Redirect Collection', desc: 'A collection of helpful redirect pages has been added.'},
    { link: 'posts/6.html', date: '9/16/20', title: 'I\'m back!', desc: 'You thought I was dead, didn\'t you?'}
    
]

var posts = []
for (var rawPostId = rawPosts.length; rawPostId > -1; rawPostId--) {
    posts[Math.abs(rawPosts.length-rawPostId-1)] = rawPosts[rawPostId]
}

document.getElementById('title-latest-0').innerHTML = posts[0].title
document.getElementById('desc-latest-0').innerHTML = `${posts[0].date}<br>${posts[0].desc}`

document.getElementById('title-latest-1').innerHTML = posts[1].title
document.getElementById('desc-latest-1').innerHTML = `${posts[1].date}<br>${posts[1].desc}`

for (var postId = 2; postId < posts.length; postId++) {
    document.getElementById('other-posts').innerHTML += `
    <div id="card-other-${postId}" class="row card-link-row rounded w-100 border-top mt-3 p-3 d-block" onclick="cardURL('other-${postId}', '${posts[postId].link}')">
        <h2 class="display-5 font-weight-light">${posts[postId].title}</h2>
        <p class="lead my-2">${posts[postId].date}: ${posts[postId].desc}</p>
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