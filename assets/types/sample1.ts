function sideEffect(): boolean {
    let luck = Math.floor(Math.random() * 10) + 1;
    return (luck % 5 === 0);
}

interface User {
    name: string;
}

function fetchUsers(): User[] { 
    if(sideEffect() === false) {
        return [
            { name: "User1" },
            { name: "User2" }
        ];
    } else { 
        throw new Error("Cannot fetch users!");
    }
}

var users = fetchUsers(); // Error!
