const DANGEROUS_KEY_PATTERN = /[$.]/
const XSS_PATTERN = /<\s*\/?\s*script\b|javascript:/gi

const sanitizeValue = (value) => {
  if (Array.isArray(value)) {
    return value.map(sanitizeValue)
  }

  if (value && typeof value === 'object') {
    for (const key of Object.keys(value)) {
      if (DANGEROUS_KEY_PATTERN.test(key)) {
        delete value[key]
        continue
      }

      value[key] = sanitizeValue(value[key])
    }
  }

  if (typeof value === 'string') {
    return value.replace(XSS_PATTERN, '')
  }

  return value
}

const sanitizeRequest = (req, _res, next) => {
  sanitizeValue(req.body)
  sanitizeValue(req.params)
  sanitizeValue(req.query)
  next()
}

export default sanitizeRequest
