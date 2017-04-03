//ES6 Classes
 
// [{
//     id: "123awsd",
//     name: "Usman",
//     room: "football fans",
// }]

class Users {
    constructor() {
        this.users = [];    //defines new attribute
    }

    addUser (id, name, room) {
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user)=>user.id !== id);
        }
        //return user that was removed
        return user;
    }

    getUser(id) {
       return this.users.filter((user) => user.id === id)[0];
    }


    getUserList (room) {
        var users = this.users.filter((user) => {
            return user.room === room;
        });
        //get only list of names
        var namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;
    }
}

// var user = new Users();
// var res = user.addUser('123','usman','anything');
// console.log(user);

// var resp = user.getUser('123');
// console.log(resp);

module.exports = {
    Users,
}