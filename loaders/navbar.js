const pages = [
    
    { title: "Home", link: "index.html" },
    { title: "Repos", link: "repos.html"},
    { title: "Products", link: "products.html"},
    { title: "Web Games", link: "webgames.html"},
    { title: "Status", link: "status.html"},
    { title: "Blog", link:"blog.html"},
    { title: "Demos", link:"demos.html"},
    { title: "Redirects", link:"redirects.html"},
    { title: "Fullscreens", link:"Fullscreens" }
    
]
    
const navlist = document.getElementById('nav-list')

var leader = ''
if (pagename == 404) leader = '/'

var navactive = ''
for (var pageId = 0; pageId < pages.length; pageId++) {
    
    navactive = ''
    if (pages[pageId].title == pagename) navactive = ' active'
    
    navlist.innerHTML += `
    <li class="nav-item">
        <a class="nav-link${navactive}" href="${leader}${pages[pageId].link}">${pages[pageId].title}</a>
    </li>`
}