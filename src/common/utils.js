const { NotFound, BadRequest } = require('http-errors');

const validateId = id => {
  if (
    !id.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    )
  ) {
    throw new BadRequest('Invalid ID');
  }
  return id;
};

const checkExistence = async (get, entityName, ...restParams) => {
  const retValue = await get(...restParams);
  if (!retValue) {
    throw new NotFound(`${entityName} not found`);
  }
  return retValue;
};

module.exports = { validateId, checkExistence };
