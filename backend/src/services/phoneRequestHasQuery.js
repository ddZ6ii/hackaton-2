/**
 * @desc check if a request contains queries and returns the proper sql request
 * @param query is the client request query filters
 * @returns {sql} is the formatted SQL request with filters to be passed along to the dedicated model handler
 * @returns {sqlValues} is the SQL request parameters (array of dependencies for the mysql .query() method) to be passed along to the dedicated model handler
 */

export default function phoneRequestHasQuery(query) {
  if (!Object.keys(query).length) return;

  let sql = 'SELECT * FROM `phone`';
  const sqlInitialValues = [];

  // check for query strings (filters)
  if (query?.marque) {
    sqlInitialValues.push({
      field: 'brand',
      value: query.marque,
      operator: '=',
    });
  }

  if (query?.modele) {
    sqlInitialValues.push({
      field: 'model',
      value: query.modele,
      operator: '=',
    });
  }

  if (query?.categorie) {
    sqlInitialValues.push({
      field: 'category',
      value: query.categorie,
      operator: '=',
    });
  }

  // format sql request (filter name(s), if any)
  sql = sqlInitialValues.reduce((acc, { field, value, operator }, index) => {
    // iteration 0:  SELECT * FROM `phone` WHERE
    acc += index === 0 ? ' WHERE' : ' AND';

    // check if the query key contains multiple values
    if (Array.isArray(value) && value.length > 1) {
      // iteration 0:  SELECT * FROM `phone` WHERE (
      acc += ' (';
      value.forEach(
        (val, jndex) =>
          (acc += ` ${field} = ? ${jndex < value.length - 1 ? 'OR' : ')'}`)
      );
    } else {
      acc += ` ${field} ${operator} ?`;
    }
    return acc;
  }, sql);

  // format sql values (filter value(s), if any)
  const sqlValues = sqlInitialValues.flatMap((obj) => obj.value);

  console.log('sql request', sql);
  console.log(sqlValues);

  return [sql, sqlValues];
}
