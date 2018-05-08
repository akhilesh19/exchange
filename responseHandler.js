module.exports={
    sendResponse:(responseObj,responseCode,responseMessage,data,paginationData)=> {  
    // console.log('responseObj',responseObj,'responseCode==',responseCode)   
         return responseObj.send({responseCode:responseCode,responseMessage:responseMessage,result:data})       
    },
   
}