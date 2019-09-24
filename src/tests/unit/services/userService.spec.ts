import { expect } from "chai";

import * as ioc from "../../../ioc";
import { generateMockUUID, generateUserModel } from "../../../utils/models";
import { UserService } from "../../../services";
import { iocContainer } from "../../../ioc";
import { SQLDbConnection } from "../../../config/SQLDbConnection";

/** we need some of this stuff on runtime */
ioc; // tslint:disable-line

describe.skip("BaseService", () => {
  let service: UserService;
  beforeEach(() => {
    const dbConnection = iocContainer.get<SQLDbConnection>(SQLDbConnection);
    dbConnection.initializeDbConnection();
    service = new UserService();
  });

  it("should getPaginated", async () => {
    const res = await service.getPaginated({ page: 0, limit: 10, sort: "ASC", field: "username", filter: "" });
    expect(res).to.have.property("count");
    expect(res).to.have.property("page");
    expect(res).to.have.property("limit");
    expect(res).to.have.property("totalPages");
    expect(res).to.have.property("docs");
    expect(res.docs).to.have.length.greaterThan(0);
  });

  it("should getById", async () => {
    const res = await service.getById(generateMockUUID());
    expect(res).to.have.property("id");
  });

  // it("should create", async () => {
  //   const model = generateUserModel();
  //   const res = await service.create(model);
  //   expect(res).to.have.property("id");
  // });

  // it("should update", async () => {
  //   const res = await service.update(generateMockUUID(), generateUserModel());
  //   expect(res).to.have.property("id");
  // });

  it("should delete", async () => {
    const res = await service.delete(generateMockUUID());
    expect(!!res).to.be.true; // tslint:disable-line
  });
});
