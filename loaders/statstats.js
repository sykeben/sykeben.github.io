$.getJSON('https://api.github.com/users/sykeben', function(json) {
    document.getElementById('follower-count').innerHTML = json.followers
    document.getElementById('following-count').innerHTML = json.following
    document.getElementById('user-since').innerHTML = new Date(json.created_at).toLocaleDateString()
})