import userModel from './models/User';

import { Sequelize } from 'sequelize';
import { config } from './config/config';

let sequelize = new Sequelize(config.url, {
    dialect: config.dialect,
    define: { timestamps: false }
});

userModel(sequelize);

export { sequelize };