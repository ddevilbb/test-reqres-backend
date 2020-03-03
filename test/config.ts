require('dotenv').config();

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  TYPEORM_CONNECTION,
  TYPEORM_DATABASE_TEST,
  TYPEORM_APP_USERNAME,
  TYPEORM_APP_PASSWORD,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_ENTITIES_DIR,
  REQRES_API_URL
} = process.env;

/* istanbul ignore next */
export default {
  typeOrm: {
    url: TYPEORM_CONNECTION + '://' + TYPEORM_APP_USERNAME + ':' + TYPEORM_APP_PASSWORD + '@' + POSTGRES_HOST + ':' + POSTGRES_PORT + '/' + TYPEORM_DATABASE_TEST,
    type: TYPEORM_CONNECTION,
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    user: TYPEORM_APP_USERNAME,
    password: TYPEORM_APP_PASSWORD,
    synchronize: TYPEORM_SYNCHRONIZE === 'true',
    logging: 'false',
    database: TYPEORM_DATABASE_TEST,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    entities: [
      TYPEORM_ENTITIES_DIR
    ],
    cli: {
      entitiesDir: TYPEORM_ENTITIES_DIR
    }
  },
  reqres: {
    apiUrl: REQRES_API_URL,
    perPage: 100
  }
};
