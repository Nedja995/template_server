import constants from "./constants";
import { Logger } from "./Logger";
import { ProvideSingleton } from "../ioc";
import { createConnection, Connection } from "typeorm";

@ProvideSingleton(SQLDbConnection)
export class SQLDbConnection {
  public connection: Connection;

  public initializeDbConnection = () => {
    const config = constants.SQL;
    Logger.info(`connecting to ${constants.environment} SQL ...`);

    createConnection(
      {
        type: "postgres",
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.username,
        synchronize: true,
        entities: [
          "src/persistance/entity/*.ts"
        ],
        migrations: [
            "src/persistance/migration/*.ts"
        ],
        subscribers: [
            "src/persistance/subscriber/*.ts"
        ],
          cli: {
            "entitiesDir": "src/persistance/entity",
            "migrationsDir": "src/persistance/migration",
            "subscribersDir": "src/persistance/subscriber"
          },
      }
    )
      .then(async connection => {
        Logger.info(`connected to ${constants.environment} SQL`);
        this.connection = connection;
      })
      .catch(error => Logger.error("TypeORM connection error: ", error));
  };
}
