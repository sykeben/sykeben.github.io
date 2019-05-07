const pages = [
    
    { title: "Home", link: "index.html" },
    { title: "Repos", link: "repos.html"},
    { title: "Products", link: "products.html"},
    { title: "Status", link: "status.html"},
    { title: "Resume", link: "resume.html"}
    
]
    
const navlist = document.getElementById('nav-list')

var navactive = ''
for (var pageId = 0; pageId < pages.length; pageId++) {
    navactive = ''
    if (pages[pageId].title == pagename) navactive = ' active'
    navlist.innerHTML += `
    <li class="nav-item">
        <a class="nav-link${navactive}" href="${pages[pageId].link}">${pages[pageId].title}</a>
    </li>`
}