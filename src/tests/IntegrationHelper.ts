import { expect } from 'chai';
import { SuperTest } from 'supertest';
import { ROOT_PATH } from './constants';

export type Response<T> = Promise<{
  status: number;
  body: T;
}>;

export class IntegrationHelper {
  public app: SuperTest<any>;
  public rootPath: string = ROOT_PATH;
  public loginPath: string = `${this.rootPath}/auth/login`;
  public userPath: string = `${this.rootPath}/users`;
  public collectionPath: string = `${this.rootPath}/collections`;

  public static setup(): void {
    xit('SQL DB', async () => {
      expect(1).to.equal(1);
    });
  }

  constructor(app: SuperTest<any>) {
    this.app = app;
  }

  public testPagination(res: any): void {
    expect(res.status).to.equal(200);
    expect(res.body.count).to.be.greaterThan(0);
    expect(res.body.page).to.be.equal(1);
    expect(res.body.limit).to.equal(1);
    expect(res.body.totalPages).to.be.greaterThan(0);
    expect(res.body.docs).to.have.length; // tslint:disable-line
  }
}
