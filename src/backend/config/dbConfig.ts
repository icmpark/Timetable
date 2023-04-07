import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  service: 'database',
  mysql: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'dbuser',
    password: 'dbuser1234',
    database: 'timetable',
    synchronize: true,
  },
  redis: {
    addr: 'localhost',
    port: '6379',
    TTL: 60 * 60
  }
}));


