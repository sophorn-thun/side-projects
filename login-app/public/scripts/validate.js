const formatError = (error) => {
  const { details } = error;
  const errors = details.map((item) => {
    return {
      key: item.context?.key,
      message: item.message
    }
  })

  return {
    status: 400,
    title: 'BAD_REQUEST',
    details: {
      errors
    }
  }
}

const validate = (schema) => {
  return async (req, res, next) => {
    const { error } = await schema.validateAsync(req.body).catch((error) => {
      return { error }
    })

    if (error) {
      return res.status(400)
        .json(formatError(error))
    }

    next()
  }
}

export default validate;