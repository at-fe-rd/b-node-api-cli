module.exports = (options) => {
  const defaultOptions = {
    model: '',
    dir: '',
    pathName: false
  }
  const { model, dir, pathName } = { ...defaultOptions, ...options }

  // Import Controllers
  const handler = require(`@controllers/${dir}${model}.controller`)[`${model}Action`]

  // Import Swagger documentation & get Schema
  const schema = require(`@schemas/${dir}${model}.schema`)[`${model}Schema`]

  // Define url
  const route = pathName ? `${dir}${pathName}` : `${dir}${model}s`;

  return {
    handler: handler,
    schema: schema,
    route: route,
    routes: [
      {
        method: 'GET',
        url: `/${route}`,
        handler: handler.index,
        schema: schema.index || null
      },
      {
        method: 'GET',
        url: `/${route}/test`,
        handler: handler.test
      },
      {
        method: 'GET',
        url: `/${route}/:id`,
        handler: handler.read,
        schema: schema.read || null
      },
      {
        method: 'POST',
        url: `/${route}`,
        handler: handler.create,
        schema: schema.create || null
      },
      {
        method: 'PUT',
        url: `/${route}/:id`,
        handler: handler.update,
        schema: schema.update || null
      },
      {
        method: 'DELETE',
        url: `/${route}/:id`,
        handler: handler.delete,
        schema: schema.delete || null
      }
    ]
  }
}
