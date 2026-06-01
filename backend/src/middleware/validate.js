import ApiError from '../utils/apiError.js'

const validate = (schema, source = 'body') => (req, _res, next) => {
  const result = schema.safeParse(req[source])

  if (!result.success) {
    return next(new ApiError(400, result.error.issues[0]?.message || 'Validation failed'))
  }

  const target = req[source]

  if (target && typeof target === 'object' && !Array.isArray(target)) {
    for (const key of Object.keys(target)) {
      delete target[key]
    }

    Object.assign(target, result.data)
  } else {
    req[source] = result.data
  }

  return next()
}

export default validate
