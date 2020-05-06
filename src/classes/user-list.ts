import { User } from "./user";

export class UserList {
    private list: User[] = [];

    //Add User
    public addUser(user: User): User {
        this.list.push(user);
        console.log(this.list);
        return user;
    };

    public updateName(id:string,name:string):void { 
        for(let user of this.list) { 
            if(user.id === id) {
                user.name = name;
                break;
            };
        };
        console.log('Actualizando usuario');
        console.log(this.list);
    };

    public getUserList(): User[] { 
        return this.list;
    };

    public getUser(id:string): User | undefined { 
        return this.list.find(user => user.id === id);
    };

    getGetUsersFromRoom(room:string): User[] { 
        return this.list.filter(user => user.room === room);
    };

    //Delete Usuario
    deleteUser(id:string): User | undefined { 
        const tempUser= this.getUser(id);
        this.list = this.list.filter(user => user.id != id);
        console.log(this.list);
        return tempUser;
    }
};