import { DataTypes, Model, Optional, Sequelize, ModelStatic } from 'sequelize';

interface UserAttributes {
    id: number;
    email: string;
    username: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export type UserType = Model<UserAttributes, UserCreationAttributes>

export default (sequelize: Sequelize): ModelStatic<UserType> => {
    return sequelize.define<UserType>('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};