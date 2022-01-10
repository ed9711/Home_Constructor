module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'rootroot',
      database: 'capstone_database',
      charset: 'utf8',
    },
  },
  production: {
    client: 'mysql',
    connection: process.env.JAWSDB_URL,
  }
};
