function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*** DATABASE CLASS ***/
function UserDatabase() {
    this.users = [];
}

UserDatabase.counter = {
    users: 0,
    posts: 0,
    comments: 0
};

UserDatabase.prototype.addUser = function(u) {
    this.users.push({
        id: UserDatabase.counter.users++,
        username: u.username,
        password: u.password,
        mail: u.username + '@doe.net',
        posts: []
    });

    /* Generate posts */
    for(let i = 0; i < 5; i++) {
        this.users[this.users.length - 1].posts.push({
            id: UserDatabase.counter.posts++,
            date: Date.now(),
            text: '[' + this.users[this.users.length - 1].username + '] Feeling gr8 today ! How about u ? - ' + i,
            comments: []
        });

        /* Generate comments */
        for(let j = 0; j < 5; j++) {
            this.users[this.users.length - 1].posts[i].comments.push({
                id: UserDatabase.counter.comments++,
                userId: getRandomInt(0, this.users.length),
                text: 'Random comment LOL - ' + UserDatabase.counter.comments
            });
        }
    }
}

module.exports = UserDatabase;