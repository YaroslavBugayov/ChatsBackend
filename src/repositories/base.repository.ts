import { Model, ModelStatic, Attributes, WhereOptions, CreationAttributes } from 'sequelize';

export class BaseRepository<M extends Model<object, object>> {
    constructor(protected model: ModelStatic<M>) { }

    async create(data: CreationAttributes<M>): Promise<M> {
        return this.model.create<M>(data);
    }

    async getById(id: number): Promise<M | null> {
        return this.model.findOne<M>({
            where: {id} as unknown as WhereOptions<Attributes<M>>
        });
    }

    async getByAttribute(attribute: WhereOptions<Attributes<M>>): Promise<M | null> {
        return this.model.findOne<M>({
            where: attribute
        })
    }

    async getAll(): Promise<M[]> {
        return this.model.findAll<M>();
    }

    async update(id: number, data: Partial<Attributes<M>>): Promise<[number]> {
        return this.model.update(
            data as Attributes<M>,
            { where: {id} as unknown as WhereOptions<Attributes<M>> }
        );
    }

    async delete(id: number): Promise<number> {
        return this.model.destroy({
            where: { id } as unknown as WhereOptions<Attributes<M>>
        });
    }
}