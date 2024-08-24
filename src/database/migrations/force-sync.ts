import { sequelize } from "../db";
import { User } from "../db";

async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // await User.sync();
        await sequelize.sync({ force: true });
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}

syncDatabase();