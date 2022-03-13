  /**
   * Convert date to timestamp 
   * @param {Object} strDateTime 
   * @returns 
   */
  const convertDateToTimeStamp = (strDateTime)=>{
    const datum = Date.parse(strDateTime);
   return datum/1000;
  }
/**
 * Convert timestamp to date
 * @param {Number} unixTimestamp 
 * @returns 
 */
  const convertTimeStampToDate = (unixTimestamp)=>{
    const milliseconds = unixTimestamp * 1000; // 1575909015000
    return new Date(milliseconds);
  }

 module.exports ={
    convertDateToTimeStamp,
    convertTimeStampToDate
  }
