function sideEffect(): boolean {
    let luck = Math.floor(Math.random() * 10) + 1;
    return (luck % 5 === 0);
}

interface INothing {
    isNothing: boolean;
}

interface IJust<T> {
    value: T;
}

interface IMaybe<T> {
    isJust: boolean;
    isNothing: boolean
    just: IJust<T>;
    nothing: INothing;
}

class Nothing implements INothing {
    public isNothing = true;
}

class Just<T> implements IJust<T> {
    public readonly value: T;
    public constructor(val: T) {
        this.value = val;
    }
}

class Maybe<T> implements IMaybe<T> {

    public readonly isJust: boolean;
    public readonly isNothing: boolean
    public readonly just: IJust<T>;
    public readonly nothing: INothing;

    public constructor(val?: T) {
        if (val !== undefined) {
            this.isJust = true;
            this.isNothing = false;
            this.nothing = null;
            this.just = new Just<T>(val);
        } else {
            this.isJust = false;
            this.isNothing = true;
            this.nothing = new Nothing();
            this.just = null;
        }
    }
}


interface User {
    name: string;
}

function fetchUsers(): Maybe<User[]> { 
    if(sideEffect() === false) {
        return new Maybe<User[]>([
            { name: "User1" },
            { name: "User2" }
        ]);
    } else { 
        return new Maybe<User[]>();
    }
}

var maybeUsers = fetchUsers();
var users: User[] = (maybeUsers.isNothing === false) ? maybeUsers.just.value : [];
