import { ProvideSingleton } from "../ioc";
import { BaseService } from "./BaseService";
import { IFoodArticleDto, PaginationDto } from "./dto";
import { isNil } from "lodash"
import { getRepository } from "typeorm";
import { FoodArticle } from "../persistance/entity/FoodArticle";

@ProvideSingleton(FoodArticleService)
export class FoodArticleService extends BaseService<IFoodArticleDto> {
  private foodArticleRepository;

  constructor() {
    super();
    this.foodArticleRepository = getRepository(FoodArticle);
  }

  public async getById(id: string): Promise<IFoodArticleDto> {
    return await this.foodArticleRepository.findOne(id);
  }

  public async create(entity: IFoodArticleDto): Promise<IFoodArticleDto> {
    const foodArticle = this.foodArticleRepository.create(entity);
    return this.foodArticleRepository.save(foodArticle);
  }

  public async getPaginated(args: any): Promise<PaginationDto> {

    let page = args.page >= 0 ? args.page : 0;
    let filter =  isNil(args.filter) ? "%" : "%" + args.filter + "%";
    let field =  isNil(args.field) ? "name" : args.field;
    let sort = args.sort ? args.sort.toUpperCase() : "ASC";

    const count = await this.foodArticleRepository
      .createQueryBuilder('foodArticle')
      .where(`${field} like :filter`, { filter: filter })
      .select('DISTINCT(`id`)')
      .getCount();

    let data = await this.foodArticleRepository
      .createQueryBuilder("article")
      .skip(page * args.limit)
      .take(args.limit)
      .where(`${field} like :filter`, { filter: filter })
      .orderBy(field, sort)
      .getMany();

    return new PaginationDto({
      count: count,
      page: page,
      limit: args.limit,
      sort: sort,
      filter: args.filter,
      totalPages: Math.ceil(count / args.limit),
      docs: data
    });
  }

  public async delete(id: string): Promise<string> {
    return await this.foodArticleRepository.delete(id);
  }

  public async update(id: string, entity: IFoodArticleDto): Promise<IFoodArticleDto> {
    const fieldsToUpdate = JSON.parse(JSON.stringify(entity));

    await this.foodArticleRepository.update(id, fieldsToUpdate);
    return await this.foodArticleRepository.findOne(id);
  }
}
