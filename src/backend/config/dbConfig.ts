import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  service: 'database',
  mysql: {
    type: 'mysql',
    host: 'mysql',
    port: 3306,
    username: 'dbuser',
    password: 'dbuser1234',
    database: 'timetable',
    synchronize: true,
    autoLoadEntities: true
  },
  redis: {
    addr: 'redis',
    port: '6379',
    TTL: 60 * 60
  }
}));


