export const asyncerror=(thefunction)=>{
    return(req,res,next)=>{
       Promise.resolve(thefunction(req,res,next))
       .catch(next);
    };
   };
   

//The asyncError function is useful for wrapping asynchronous route handlers or middleware in an Express.js application.
// It simplifies error handling by automatically passing any errors to the error-handling middleware, allowing you to
// avoid writing repetitive try-catch blocks.