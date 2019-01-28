module.exports = (options) => {
  const defaultOptions = {
    controller: '',
    dir: '',
    path: undefined
  }
  const { controller, dir, path } = { ...defaultOptions, ...options }
  const relativeDir = `${dir}${controller}`
  console.log(relativeDir, controller, dir, path);

  // Import Controllers
  const handler = require(`@controllers/${relativeDir}.controller`)[`${controller}Action`]

  // Import Swagger documentation & get Schema
  const schema = require(`@schemas/${relativeDir}.schema`)[`${controller}Schema`]

  // Define url
  const route = path ? `${path}` : `${relativeDir}s`

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
