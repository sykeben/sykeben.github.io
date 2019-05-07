$.getJSON('https://api.github.com/users/sykeben/repos', function(json) {
    document.getElementById('repo-count').innerHTML = json.length
})