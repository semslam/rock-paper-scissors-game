const {isEmpty,
  isObjEmpty,
  isNotEmpty,
  existProperty,
  isNumber,
  isBoolean,
  isString,
  isNullOrUndefinedType,
  isArray,
  isTrue,
  getType,
  isFalse,
  isNull,
  hasValue,} = require("../libraries/Validator");

describe('validator Test', () => {
  const obj = {valueNotSet: '', valueSet: 'value'};
  const booleanVal = true;
  const booleanStr = 'true';
  const booleanStrFalse = 'false';
  const boolInt = 1;
  const boolIntFalse = 0;

  test('Test isNullOrUndefined ', () => {
    expect(isEmpty(booleanStr)).toBeFalsy();
    expect(isEmpty(obj)).toBeFalsy();

    // true
    expect(isEmpty()).toBeTruthy();
    expect(isEmpty(boolIntFalse)).toBeTruthy();
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty(undefined)).toBeTruthy();
    expect(isEmpty(null)).toBeTruthy();
  });

  test('Test isNull', () => {
    expect(isNull(booleanStr)).toBeFalsy();
    expect(isNull(obj)).toBeFalsy();
    expect(isNull('')).toBeFalsy();
    expect(isNull(undefined)).toBeFalsy();

    // true
    expect(isNull(null)).toBeTruthy();
  });

  test('Test isNotEmpty ', () => {
    expect(isNotEmpty('')).toBeFalsy();
    expect(isNotEmpty()).toBeFalsy();
    expect(isNotEmpty(obj, 'valueNotSet')).toBeFalsy();
    expect(isNotEmpty(obj, 'doesNotExistKey')).toBeFalsy();
    // true
    expect(isNotEmpty(obj, 'valueSet')).toBeTruthy();
  });

  test('Test hasValue ', () => {
    expect(hasValue('')).toBeFalsy();
    expect(hasValue()).toBeFalsy();
    expect(hasValue(obj, 'valueNotSet')).toBeFalsy();
    expect(hasValue(obj, 'doesNotExistKey')).toBeFalsy();
    // true
    expect(hasValue(obj, 'valueSet')).toBeTruthy();
  });

  test('Test isArray ', () => {
    expect(isArray('')).toBeFalsy();
    expect(isArray()).toBeFalsy();
    expect(isArray(null)).toBeFalsy();
    expect(isArray(obj)).toBeFalsy();
    expect(isArray('not an array')).toBeFalsy();
    // true
    expect(isArray([])).toBeTruthy();
  });

  test('Test existProperty ', () => {
    expect(existProperty('')).toBeFalsy();
    expect(existProperty()).toBeFalsy();
    expect(existProperty(obj, 'doesNotExistKey')).toBeFalsy();
    // true
    expect(existProperty(obj, 'valueNotSet')).toBeTruthy();
    expect(existProperty(obj, 'valueSet')).toBeTruthy();
  });
  test('Test isString ', () => {
    expect(isString(booleanVal)).toBeFalsy();
    expect(isString(boolInt)).toBeFalsy();
    expect(isString(booleanVal)).toBeFalsy();
    expect(isString(boolIntFalse)).toBeFalsy();
    expect(isString()).toBeFalsy();
    expect(isString(obj)).toBeFalsy();
    expect(isString(1234)).toBeFalsy();
    expect(isString([])).toBeFalsy();
    // true
    expect(isString(booleanStr)).toBeTruthy();
    expect(isString(booleanStrFalse)).toBeTruthy();
    expect(isString('')).toBeTruthy();
    expect(isString('test')).toBeTruthy();
    expect(isString(obj.valueSet)).toBeTruthy();
  });

  test('Test isBoolean ', () => {
    expect(isBoolean('')).toBeFalsy();
    expect(isBoolean()).toBeFalsy();
    expect(isBoolean(obj)).toBeFalsy();
    expect(isBoolean(1234)).toBeFalsy();
    expect(isBoolean([])).toBeFalsy();
    expect(isBoolean({})).toBeFalsy();
    // true
    expect(isBoolean('1')).toBeTruthy();
    expect(isBoolean('0')).toBeTruthy();
    expect(isBoolean('TRUE')).toBeTruthy();
    expect(isBoolean('FALSE')).toBeTruthy();
    expect(isBoolean(booleanVal)).toBeTruthy();
    expect(isBoolean(booleanStr)).toBeTruthy();
    expect(isBoolean(booleanStrFalse)).toBeTruthy();
    expect(isBoolean(boolInt)).toBeTruthy();
    expect(isBoolean(booleanVal)).toBeTruthy();
    expect(isBoolean(boolIntFalse)).toBeTruthy();
  });

  test('Test isNumber ', () => {
    expect(isNumber('')).toBeFalsy();
    expect(isNumber()).toBeFalsy();
    expect(isNumber(obj)).toBeFalsy();
    expect( isNumber([])).toBeFalsy();
    expect( isNumber({})).toBeFalsy();
    expect( isNumber('1')).toBeFalsy();
    expect( isNumber('0')).toBeFalsy();
    expect( isNumber('TRUE')).toBeFalsy();
    expect( isNumber('FALSE')).toBeFalsy();
    expect( isNumber(booleanStr)).toBeFalsy();
    expect( isNumber(booleanVal)).toBeFalsy();
    expect( isNumber(booleanStrFalse)).toBeFalsy();
    expect( isNumber(booleanVal)).toBeFalsy();

    expect( isNumber(boolInt)).toBeTruthy();
    expect( isNumber(boolIntFalse)).toBeTruthy();
    expect( isNumber(1234)).toBeTruthy();
  });

  test('Test isTrue ', () => {
    expect( isTrue('')).toBeFalsy();
    expect( isTrue()).toBeFalsy();
    expect( isTrue(obj)).toBeFalsy();
    expect( isTrue(1234)).toBeFalsy();
    expect( isTrue([])).toBeFalsy();
    expect( isTrue({})).toBeFalsy();
    // true
    expect( isTrue('1')).toBeTruthy();
    expect( isTrue('0')).toBeFalsy();
    expect( isTrue('TRUE')).toBeTruthy();
    expect( isTrue('FALSE')).toBeFalsy();
    expect( isTrue(booleanVal)).toBeTruthy();
    expect( isTrue(booleanStr)).toBeTruthy();
    expect( isTrue(booleanStrFalse)).toBeFalsy();
    expect( isTrue(boolInt)).toBeTruthy();
    expect( isTrue(booleanVal)).toBeTruthy();
    expect( isTrue(boolIntFalse)).toBeFalsy();
  });

  test('Test isFalse ', () => {
    expect( isFalse('')).toBeFalsy();
    expect( isFalse()).toBeFalsy();
    expect( isFalse(obj)).toBeFalsy();
    expect( isFalse(1234)).toBeFalsy();
    expect( isFalse([])).toBeFalsy();
    expect( isFalse({})).toBeFalsy();
    // true
    expect( isFalse('1')).toBeFalsy();
    expect( isFalse('0')).toBeTruthy();
    expect( isFalse('TRUE')).toBeFalsy();
    expect( isFalse('FALSE')).toBeTruthy();
    expect( isFalse(booleanStrFalse)).toBeTruthy();
    expect( isFalse(boolInt)).toBeFalsy();
    expect( isFalse(booleanVal)).toBeFalsy();
    expect( isFalse(boolIntFalse)).toBeTruthy();
  });
  test('Test getType ', () => {
    expect( getType(null)).toEqual('null');
    expect( getType(undefined)).toEqual('undefined');
    expect( getType(obj)).toEqual('object');
    expect( getType('obj')).toEqual('string');
    expect( getType(true)).toEqual('boolean');
  });

  test('Test isNullOrUndefinedType ', () => {
    expect(isNullOrUndefinedType(null)).toEqual('null');
    expect(isNullOrUndefinedType(undefined)).toEqual('undefined');
  });
  test('Test isObjEmpty ', () => {
    expect(isObjEmpty({})).toBeTruthy();
    expect(isObjEmpty(obj)).toBeFalsy();
    expect(isObjEmpty(1234)).toBeTruthy();
    expect(isObjEmpty([])).toBeTruthy();
  });

});
