import userModel from './models/user.model';

import { Sequelize } from 'sequelize';
import { config } from './config/config';

let sequelize = new Sequelize(config.url, {
    dialect: config.dialect,
    define: { timestamps: false }
});

const User = userModel(sequelize);

export { sequelize };
export { User };