import ApiError from '../utils/apiError.js'

const notFound = (_req, _res, next) => next(new ApiError(404, 'Route not found'))

export default notFound
