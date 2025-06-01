
function test(a){
    const x = a;
}

function catchError(fn){
    return (arg)=>{
        try{
        return fn(arg); // dyncamic 

    }catch(error){
        console.log(error.message)
    }
        
    }
}
const returnedFunction = catchError(test);
console.log(returnedFunction(10))