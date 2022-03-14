// User interface
declare interface IUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  department: string;
}

declare interface IUser extends IUserRequest {
  id: string;
}
