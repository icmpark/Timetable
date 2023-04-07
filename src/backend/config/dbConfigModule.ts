import { Injectable, Module } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import dbConfig from "./dbConfig";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class DBConfigService {
  constructor(@Inject(dbConfig.KEY) public config: ConfigType<typeof dbConfig>) {}

  makeMongoDBUri(): string {
    const conf = this.config.mongodb;
    return `mongodb://${conf.auth.user}:${conf.auth.pass}@${conf.addr}:${conf.port}/${conf.name}`
  }

}

@Module({
    providers: [DBConfigService],
    exports: [DBConfigService]
})
export class DBConfigModule {}