function sideEffect(): boolean {
    let luck = Math.floor(Math.random() * 10) + 1;
    return (luck % 5 === 0);
}

interface User {
    name: string;
}

type Maybe<T> = undefined | T;

function fetchUsers(): Maybe<User[]> { 
    if(sideEffect() === false) {
        return [
            { name: "User1" },
            { name: "User2" }
        ];
    }
}

var maybeUsers = fetchUsers();
maybeUsers.forEach((user: User) => { console.log(name); }); //  Error: Object is possibly 'undefined' :)
