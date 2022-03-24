/**
 * Will let you know if this is a null or undefined value
 * @param {*} value
 * @return {boolean}
 */
const isEmpty = (value) => {
  if (value === undefined || !value) {
    return true;
  }
  return value === null;
};

/**
 * Check if the the object is empty or not
 * @param {*} obj
 * @return {boolean}
 */
const isObjEmpty = (obj) =>{
  return Object.keys(obj).length === 0;
};


  /**
   * isArray returns boolean true value if object is a array type
   * @param  {object} obj
   * @return {boolean} result - result of type of check
   */
const isArray = (obj)=>{
  if (!obj) {
    return false;
  }
  return Array.isArray(obj);
};

/**
 * Determines if value is Null
 * @param  {object} value
 * @return {boolean} result - result of type of check
 */
const isNull = (value)=>{
  return value === null;
};

/**
 * It will return the type 
 * @param {*} value
 * @return {string}
 */
const isNullOrUndefinedType = (value) => {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  return typeof value;
};
/**
 * isNotEmpty confirms that object contains property
 * and thats its defined
 * @param  {object} object - object to confirm if property exist/define
 * @param  {string} key - property key to look up
 * @return {boolean} result - result of check
 */
const isNotEmpty = (object, key) => {
  return object && Object.prototype.hasOwnProperty.call(object, key) && object[key];
};
/**
* hasValue confirms that object contains property with value
* and thats its defined
* @param  {object} object - object to confirm if property exist/define
* @param  {string} key - property key to look up
* @return {boolean} result - result of check
 */
const hasValue = (object, key) => {
  return object && Object.prototype.hasOwnProperty.call(object, key) && object[key] && !isEmpty(object[key]);
};
/**
 * ExistProperty confirms that the object has property
 * DOES NOT confirm if value is defined
 * @param  {any} object - object to confirm if property exist
 * @param  {string} key - property key to look up
 * @return {boolean} result - result of check
 */
const existProperty = (object, key) => {
  return object && Object.prototype.hasOwnProperty.call(object, key);
};
/**
 * isBoolean return boolean true if object is of boolean type
 * @param  {any} value - object to confirm if boolean type
 * @return {boolean} result - result of type of check
 */
const isBoolean = (value) => {
  return (
    value === true ||
    value === 'true' ||
    value === 'false' ||
    value === false ||
    value === 1 ||
    value === 0 ||
    value === 'TRUE' ||
    value === 'FALSE' ||
    value === '1' ||
    value === '0'
  );
};
/**
 * isTrue returns true is the value is
 * boolean true
 * @param  {*} value
 * @return {boolean} True || fasle
 */
const isTrue = (value) => {
  return (
    value === true ||
    value === 'true' ||
    value === 1 ||
    value === 'TRUE' ||
    value === '1'
  );
};

/**
 * isFalse returns true is the value is
 * boolean false
 * @param  {*} value
 * @return {boolean} True || fasle
 */
const isFalse = (value) => {
  return (
    value === 'false' ||
    value === false ||
    value === 0 ||
    value === 'FALSE' ||
    value === '0'
  );
};

/**
 * It will return the type back to you
 * @param {*} value
 * @return {string}
 */
 const getType = (value) => {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  return typeof value;
};

/**
 * IsString returns boolean true valiue if object is a string type
 * @param  {any} value - object to confirm if string type
 * @return {boolean} result - result of type of check
 */
const isString = (value) => {
  return typeof value === 'string';
};

/**
 * Checks if the type of value is of number
 * @param  {*} value
 * @return {boolean} result - result of type of check
 */
const isNumber = (value) => {
  return getType(value) === 'number' && !isNaN(value)? true : false;
};
/**
 * Remove undefine from object and return the object
 * @param {Object} obj 
 * @returns {Object} obj
 */
const removeUndefineInObj =(obj)=>{
  for (const key in obj) {
   if (obj[key] === undefined) {
     delete obj[key];
   }
 }
 return obj;
 }


module.exports ={
  isEmpty,
  isObjEmpty,
  isNotEmpty,
  existProperty,
  isNumber,
  isBoolean,
  isString,
  isNullOrUndefinedType,
  isArray,
  isTrue,
  isFalse,
  getType,
  isNull,
  hasValue,
  removeUndefineInObj
};
