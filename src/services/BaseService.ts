import { decorate, injectable } from "inversify";
import { PaginationDto } from "./dto";

export abstract class BaseService<EntityModel> {
  public abstract async getById(id: string): Promise<EntityModel>;

  public abstract async getPaginated(
    page: number,
    limit: number,
    sort: string,
    field: string,
    filter: string
  ): Promise<PaginationDto>;

  public abstract async create(entity: EntityModel): Promise<EntityModel>;

  public abstract async update(
    id: string,
    entity: EntityModel
  ): Promise<EntityModel>;

  public abstract async delete(id: string): Promise<string>;
}

decorate(injectable(), BaseService);
