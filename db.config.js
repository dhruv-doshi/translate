module.exports = {
    HOST: HOST,
    USER: USERNAME,
    PASSWORD: PASSWORD,
    DB: DATABASE_NAME,
    dialect: "postgres",
    ssl: 1,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };