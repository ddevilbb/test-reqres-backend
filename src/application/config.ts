require('dotenv').config();

const {
  APPLICATION_PORT,
  POSTGRES_HOST,
  POSTGRES_PORT,
  TYPEORM_CONNECTION,
  TYPEORM_DATABASE,
  TYPEORM_APP_USERNAME,
  TYPEORM_APP_PASSWORD,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_LOGGING,
  TYPEORM_ENTITIES_DIR,
  REQRES_API_URL,
  REQRES_API_PER_PAGE
} = process.env;

export default {
  app: {
    port: parseInt(APPLICATION_PORT, 10) || 3000
  },
  typeOrm: {
    url: TYPEORM_CONNECTION + '://' + TYPEORM_APP_USERNAME + ':' + TYPEORM_APP_PASSWORD + '@' + POSTGRES_HOST + ':' + POSTGRES_PORT + '/' + TYPEORM_DATABASE,
    type: TYPEORM_CONNECTION,
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    user: TYPEORM_APP_USERNAME,
    password: TYPEORM_APP_PASSWORD,
    synchronize: TYPEORM_SYNCHRONIZE === 'true',
    logging: TYPEORM_LOGGING === 'true',
    database: TYPEORM_DATABASE,
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
    perPage: parseInt(REQRES_API_PER_PAGE) || 10
  }
};
