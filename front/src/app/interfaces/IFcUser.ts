export interface IUser {
    name: String;
    id: String;
    password: String;
    registeredDate: Date;
    language: String;
}

export interface ICreateUserReq {
    name: String;
    id: String;
    password: String;
}
