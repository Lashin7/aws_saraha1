// - Fixed values → Belong in the outer function (these don’t change within the function’s execution).
// - Flexible values → Belong in the inner function (these change each time the function runs).
// we did it below to make the middleware more dynaminc not limited to one function to aviod hardcoding

export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) =>{
            // check if error is empty object 
            return (Object.keys(error).length==0)? next(new Error(error.message)): next(error);
        });
    }
}