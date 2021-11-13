import { dev_config } from './dev';
import { prod_config } from './prod';
import { test_config } from './testing';

const env = process.env.NODE_ENV || 'development';

const base_config = {
  env,
  port: process.env.PORT || 5000,
  secrets: {
    jwt: process.env.jwt_secret,
    jwt_exp: process.env.jwt_exp,
  },
};

let env_config = {};

switch (env) {
  case 'development':
    env_config = {
      ...dev_config,
      secrets: { ...base_config.secrets, ...dev_config.secrets },
    };
    break;
  case 'test':
    env_config = {
      ...test_config,
      secrets: { ...base_config.secrets, ...test_config.secrets },
    };
    break;
  case 'production':
    env_config = {
      ...prod_config,
      secrets: { ...base_config.secrets, ...prod_config.secrets },
    };
  default:
    env_config = {
      ...dev_config,
      secrets: { ...base_config.secrets, ...dev_config.secrets },
    };
}

const app_config = { ...base_config, ...env_config };

export default app_config;
