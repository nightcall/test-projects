/*** DATABASE CLASS ***/
function Database() {
    this.users = [];
    this.posts = [];
}

Database.counter = {
    users: 0,
    posts: 0,
    comments: 0
};

Database.prototype.getUser = function(username) {
    return this.users.find(user => user.username == username);
}

Database.prototype.getPostIndex = function(pID) {
    return this.posts.findIndex(post => post.id == pID);
}

Database.prototype.addUser = function(u) {
    this.users.push({
        id: Database.counter.users++,
        username: u.username,
        password: u.password,
        mail: u.username + '@doe.net',
        posts: []
    });
}

Database.prototype.addPost = function(u, p) {
    const user = this.getUser(u);

    if(user == 'undefined') {
        console.log('addPost error');
        return;
    }

    this.posts.push({
        id: Database.counter.posts++,
        user: user,
        content: p,
        date: Date.now(),
        comments: []
    });
}

Database.prototype.addComment = function(pID, u, c) {
    const user = this.getUser(u);
    const postIndex = this.getPostIndex(pID);

    if(user == 'undefined'
    || postIndex == 'undefined') {
        console.log('addComment error');
        return;
    }

    this.posts[postIndex].comments.push({
        id: Database.counter.comments++,
        user: user,
        content: c,
        date: Date.now()
    });
}

Database.prototype.getUserPosts = function(u) {
    const user = this.getUser(u);

    if(user == 'undefined') {
        console.log('getUserPosts error');
        return;
    }

    return this.posts.filter(p => p.user.id == user.id);
}

Database.prototype.dump = function() {
    this.users.forEach(u => {

        console.log(`[id: ${u.id}] ${u.username}`);
        this.getUserPosts(u.username).forEach(p => {

            console.log(`---- [id : ${p.id}] ${p.content}`);
            p.comments.forEach(c => {

                console.log(`-------- [${c.user.username}] ${c.content}`);
            })
        });
    }); 
}

module.exports = Database;