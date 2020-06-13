import Joi from '@hapi/joi'
import { Set } from './set.js'

export class Workout {
    constructor(dto) {
        validate(dto)
        if(dto._id) this._id = dto._id
        this.title = dto.title
        this.sets = buildSets(dto.sets)
    }
}

function validate(dto) {
    const schema = Joi.object({
        _id: Joi.string(),
        title: Joi.string().required(),
        sets: Joi.array().required().min(1)
    });
    const { error } = schema.validate(dto)
    if (error) {
        throw error
    }
}

function buildSets(setsDtos) {
    return setsDtos.map(dto => new Set(dto))
}