const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    var newUsers;
    beforeEach(() => {
        newUsers = new Users();
        newUsers.users = [{id:'1',name:'Usman',room:'football fans'},{id:'2',name:'Fatima',room:'Bieber fans'},{id:'3',name:'Imadi',room:'Office fans'}];
    });

    it('should add new users', () => {
        var newUsers = new Users();
        var user = {
            id: 123,
            name: 'Usman',
            room: 'office fans',
        }

        var responseUser = newUsers.addUser(user.id,user.name,user.room);
        expect(newUsers.users).toEqual([user]);
    });

    it('should find user', () => {
        var userId = '2';
        var user = newUsers.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = '99';
        var user = newUsers.getUser(userId);
        expect(user).toNotExist();
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = newUsers.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(newUsers.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId = '99';
        var user = newUsers.removeUser(userId);
        expect(user).toNotExist();
        expect(newUsers.users.length).toBe(3);
    });
    // it(`should return users with id 2`, () => {
    //     var userList = newUsers.getUser('2');
    //     expect(userList).toEqual(['Fatima']);
    // });
});