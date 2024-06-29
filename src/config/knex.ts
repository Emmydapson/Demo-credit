import knex from 'knex';
import knexConfig from '../../knexfile';

const environment = process.env.NODE_ENV || 'development';
const configOptions = knexConfig[environment];

export default knex(configOptions);
