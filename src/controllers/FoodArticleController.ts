import * as express from 'express';
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
  Tags,
  Request,
} from "tsoa";

import { ProvideSingleton, inject } from "../ioc";
import { IFoodArticleDto, IPaginationDto } from "../services/dto";
import { FoodArticleService } from "../services";

@Tags("foodArticles")
@Route("foodArticles")
@ProvideSingleton(FoodArticleController)
export class FoodArticleController extends Controller {
  constructor(@inject(FoodArticleService) private service: FoodArticleService) {
    super();
  }

  @Get("{id}")
  public async getById(id: string): Promise<IFoodArticleDto> {
    return this.service.getById(id);
  }

  @Get()
  public async getPaginated(
    @Request() request: express.Request,
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query("sort") sort?: string,
    @Query("field") field?: string,
    @Query("filter") filter?: string,
  ): Promise<IPaginationDto> {
    return this.service.getPaginated({page, limit, sort, field, filter});
  }

  @Response(400, "Bad request")
  @Post()
  public async create(@Body() body: IFoodArticleDto): Promise<IFoodArticleDto> {
    return this.service.create(body);
  }

  @Response(400, "Bad request")
  @Security("admin")
  @Put("{id}")
  public async update(id: string, @Body() body: IFoodArticleDto): Promise<IFoodArticleDto> {
    return this.service.update(id, body);
  }

  @Security("admin")
  @Delete("{id}")
  public async delete(id: string): Promise<string> {
    return this.service.delete(id);
  }
}
