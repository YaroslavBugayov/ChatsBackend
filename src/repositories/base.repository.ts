import { Model } from 'sequelize';

export class BaseRepository<M extends Model<object, object>> {
    constructor(protected model: M) { }

    async create(data: any): Promise<M> {
        return this.model.create(data);
    }

    async getById(id: number): Promise<M | null> {
        return this.model.findOne({
            where: {id}
        });
    }

    async getByAttribute(attribute: any): Promise<M | null> {
        return this.model.findOne({
            where: attribute
        })
    }

    async getAll(): Promise<M[]> {
        return this.model.findAll();
    }

    async update(id: number, data: any): Promise<[number, M[]]> {
        return this.model.update(
            { data: data },
            { where: {id} }
        );
    }

    async delete(id: number): Promise<number> {
        return this.model.destroy({
            where: {id}
        });
    }
}