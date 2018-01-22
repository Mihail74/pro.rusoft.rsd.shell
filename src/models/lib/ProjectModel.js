import Joi from 'joi'
import AbstractModel from './AbstractModel'
import ProjectShort from './ProjectShort'

export const schema = () => ({
  descriptor: Joi.object().type(ProjectShort)
})

export default class ProjectModel extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }

  get id () {
    return this.descriptor.id
  }

  static fromJS (data, context = {}) {
    return data == null ? null : new ProjectModel(project => ({
      ...data,
      descriptor: ProjectShort.fromJS(data, { ...context, project: project.model })
    }))
  }
}
