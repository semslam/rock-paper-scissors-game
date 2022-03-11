const printOutType = [
    "temporaryTied",
    "permanentTied",
    "currentScore",
    "winner",
    ];
    // repeated values
const repeatedValues = [
    "rock",
    "paper",
    "scissors",
    "computer",
    "tied",
    "humanVsComputer",
    "computerVsComputer",
    ];

const isConsoleOrApi = ["console","api"]
const resType = {draw:"Draw",win:"Win"}
const gender = {MALE:"Male",FEMALE:"Female"}

const ErrorCodes = {
        LOCKING_ERROR: 102,
        INVALID_TOKEN: 103,
        MISSING_STORE_GROUP_EVENT_TOPIC_ERROR: 104,
        CUSTOMER_DATA_ERROR: 106,
        SCHEMA_VALIDATION_ERROR: 110,
        PRODUCT_INVENTORY_ERROR: 120,
        BOPS_PRODUCT_INVENTORY_ERROR: 121,
        PRODUCT_TYPE_ERROR: 123,
        CREDIT_ERROR: 130,
        NOT_ENOUGH_REWARD_POINTS: 140,
        TAX_FAILOVER: 145,
        TAX_ERROR: 146,
        UPDATE_OPERATION_FAILURE: 150,
        MISSING_PARAMETER: 400,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        CARTLINE_NOT_FOUND: 405,
        INTERNAL_ERROR: 500,
        PRODUCT_DATA_ERROR: 504,
        SHIPPING_DATA_ERROR: 505,
        PRICING_MODEL_ERROR: 507,
        DB_ERROR: 509,
        VALIDATION_CREDIT_ERROR: 510,
        PRICING_ERROR: 511,
        VALIDATION_ERROR: 512,
        VALIDATION_INVALID_TOKEN: 513,
        CHECKOUT_CART_ERROR: 530,
        CHECKOUT_PRODUCT_INVENTORY_ERROR: 520,
        MISSING_REQUIRED_ORDER_PARAMETER: 550,
        BOPS_STORE_ID_MISMATCH_ERROR: 521,
      };
      
      const HttpCodes = {
        OK: 200,
        CREATED: 201,
        ACCEPTED: 202,
        NOCONTENT: 204,
        NOTACCEPTABLE: 406
      };

module.exports ={
    printOutType,
    repeatedValues,
    isConsoleOrApi,
    ErrorCodes,
    HttpCodes,
    resType,
    gender
}