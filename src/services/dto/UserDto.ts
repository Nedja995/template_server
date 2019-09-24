export interface IUserDto {
  id?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  password: string;
  email: string;
  phone?: string;
  userStatus?: number;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRegisterDto {
  email: string;
  password: string;
}

export interface ILoginDto {
  email: string;
  password: string;
}

export interface ILoginSuccessfullyDto {
  auth_token: string;
  admin: boolean;
}

export class LoginSuccessfullyDto implements ILoginSuccessfullyDto {
  public auth_token: string;
  public admin: boolean;

  constructor(args: ILoginSuccessfullyDto) {
    Object.assign(this, args);
  }
}
