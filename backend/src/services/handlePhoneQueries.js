/**
 * @desc check if a request contains queries and returns the proper sql request
 * @param query is the client request query filters
 * @returns {sqlRequest} is the formatted SQL request with filters to be passed along to the dedicated model handler
 * @returns {sqlDependencies} is the SQL request parameters (array of dependencies for the mysql .query() method) to be passed along to the dedicated model handler
 */

function chainOrConditions(accumulator, values, field) {
  accumulator += ' (';
  values.forEach(
    (_, index) =>
      (accumulator += ` ${field} = ? ${index < values.length - 1 ? 'OR' : ')'}`)
  );
  return accumulator;
}

function formatRequest(filters, req) {
  return filters.reduce((acc, { field, value, operator }, index) => {
    acc += index === 0 ? ' WHERE' : ' AND';

    // check if query filter (object) contains multiple values (array)
    const hasMultipleValues = Array.isArray(value) && value.length > 1;

    if (hasMultipleValues) {
      acc = chainOrConditions(acc, value, field);
    } else {
      acc += ` ${field} ${operator} ?`;
    }
    return acc;
  }, req);
}

function handlePhoneQueries(query) {
  if (!Object.keys(query).length) return;

  let sqlRequest =
    'SELECT * FROM phone LEFT JOIN feature ON feature.phone_id = phone.id_phone';

  const queryFilters = [];

  // check for query strings (filters)
  if (query.marque) {
    queryFilters.push({
      field: 'brand',
      value: query.marque,
      operator: '=',
    });
  }

  if (query.modele) {
    queryFilters.push({
      field: 'model',
      value: query.modele,
      operator: '=',
    });
  }

  if (query.categorie) {
    queryFilters.push({
      field: 'category',
      value: query.categorie,
      operator: '=',
    });
  }

  // format sql request
  sqlRequest = formatRequest(queryFilters, sqlRequest);

  // format sql query array of dependencies
  const sqlDependencies = queryFilters.flatMap((obj) => obj.value);

  return [sqlRequest, sqlDependencies];
}

export default handlePhoneQueries;
