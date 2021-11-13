export const test_config = {
  secrets: {
    jwt: 'process.env.jwt_secret',
  },
  db_url: process.env.mongo_test_url,
};
