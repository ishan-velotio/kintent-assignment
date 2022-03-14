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
  
  declare interface IAuthorRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: Date;
  }
  
  declare interface IAuthor extends IAuthorRequest {
    id: number;
  }
  
  declare interface IBookRequest {
    name: string;
    authorIds: number[];
    description: string;
    publishYear: number;
    publisher: string;
    version: string;
  }
    
  declare interface IBook {
    id: number;
    name: string;
    description: string;
    publishYear: number;
    publisher: string;
    version: string;
    authors?: string[]
  }