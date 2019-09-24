import {
  Route,
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Security,
  Query,
  Body,
  Response,
  Tags
} from "tsoa";

import { ProvideSingleton, inject } from "../ioc";
import {
  IUserDto,
  IPaginationDto,
  ILoginDto,
  LoginSuccessfullyDto,
  IRegisterDto
} from "../services/dto";
import { UserService } from "../services";
import { User } from "../persistance/entity/User";

@Tags("users")
@Route("users")
@ProvideSingleton(UserController)
export class UserController extends Controller {
  constructor(@inject(UserService) private service: UserService) {
    super();
  }

  @Get("{id}")
  public async getById(id: string): Promise<IUserDto> {
    return this.service.getById(id);
  }

  @Get()
  @Security("admin", ["ADMIN"])
  public async getPaginated(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("sort") sort?: string,
    @Query("field") field?: string,
    @Query("filter") filter?: string
  ): Promise<IPaginationDto> {
    return this.service.getPaginated({page, limit, sort, field, filter});
  }

  @Response(400, "Bad request")
  @Security("admin")
  @Post()
  public async create(@Body() body: IUserDto): Promise<IUserDto> {
    return this.service.create(body);
  }

  @Response(400, "Bad request")
  @Security("admin")
  @Put("{id}")
  public async update(id: string, @Body() body: IUserDto): Promise<IUserDto> {
    return this.service.update(id, body);
  }

  @Security("admin")
  @Delete("{id}")
  public async delete(id: string): Promise<string> {
    return this.service.delete(id);
  }

  @Response(400, "Bad request")
  @Post("/register")
  public async register(@Body() body: IUserDto): Promise<LoginSuccessfullyDto> {
    console.log('request');
    return this.service.register(body);
  }

  @Response(400, "Bad request")
  @Post("/login")
  public async login(@Body() body: ILoginDto): Promise<LoginSuccessfullyDto> {
    return this.service.login(body);
  }
  
}
