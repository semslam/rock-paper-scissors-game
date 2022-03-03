
  const convertDateToTimeStamp = (strDateTime)=>{
    let datum = Date.parse(strDateTime);
   return datum/1000;
  }

  const convertTimeStampToDate = (unixTimestamp)=>{
    const milliseconds = unixTimestamp * 1000; // 1575909015000
    return new Date(milliseconds);
  }

 export {
    convertDateToTimeStamp,
    convertTimeStampToDate
  }
