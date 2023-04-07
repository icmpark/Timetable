import { Injectable, Module } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import dbConfig from "./dbConfig";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class DBConfigService {
  constructor(@Inject(dbConfig.KEY) public config: ConfigType<typeof dbConfig>) {}

  makeMySQLConfig(): {[key: string]: string | number | string[] | boolean} {
    return this.config.mysql;
  }

}

@Module({
    providers: [DBConfigService],
    exports: [DBConfigService]
})
export class DBConfigModule {}