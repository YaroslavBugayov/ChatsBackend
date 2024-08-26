import { Model, ModelStatic, Attributes, WhereOptions, CreationAttributes, Optional, Error } from 'sequelize';
import { ApiError } from '../errors/api.error';

export class BaseRepository<M extends Model<object, object>> {
    constructor(protected model: ModelStatic<M>) { }

    async create(data: CreationAttributes<M>): Promise<M> {
        try {
            return await this.model.create<M>(data);
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }

    async getById(id: number): Promise<M | null> {
        try {
            return this.model.findOne<M>({
                where: {id} as unknown as WhereOptions<Attributes<M>>
            });
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }

    async getByAttribute(attribute: WhereOptions<Attributes<M>>): Promise<M | null> {
        try {
            return this.model.findOne<M>({
                where: attribute
            })
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }

    async getAll(): Promise<M[]> {
        try {
            return this.model.findAll<M>();
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }

    async update(id: number, data: Partial<Attributes<M>>): Promise<[number]> {
        try {
            return this.model.update(
                data as Attributes<M>,
                { where: {id} as unknown as WhereOptions<Attributes<M>> }
            );
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }

    async delete(id: number): Promise<number> {
        try {
            return this.model.destroy({
                where: { id } as unknown as WhereOptions<Attributes<M>>
            });
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }
}