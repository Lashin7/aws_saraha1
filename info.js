// forge package for the assymetric 
// crypto-js is for symmetric but discontinued

// Authentication
// Session-based authentication
// MVC >>  Model view controller design pattern

// MVC >> FRONTEND BACKEND
// when the user logins makes something called session endures valid and live untill the user logs out

// API Application Programming Interface

// F   >>  Request HTTP LOGIN  >>  B
// B   >>  RESPONSE            >>  F

// SHOWS Something token based authentication
// ama btlog in b request login el backend byrg3 token (identity bta3t el user) l2n el http msh hayfkrk towel ma anta logged wa bt3mmel likes aw bt7ot post ,,el mohm el backend byb3t el token wa y2ol ll browser 5aleha 3andk  


// Hydrated document is a document generated when you fetch a data usually returned as a mongoose doument from the database including lots of built in features like methods and virtuals
// Hydration is the process of converting a plain object back into a mongoose document 
// by using .hydrate(), on the other hand, there is a method called .lean() to lean all the extra details or in other words to convert the mongoose document to a plain one

// Difference between .lean() and .toObject()

// When you use .lean(), MongoDB returns plain JavaScript objects instead of full Mongoose models. This makes things faster because:
// - Mongoose doesn’t add extra features (like virtual properties or instance methods).
// - Lower memory usage because it skips unnecessary processing.
// - Faster performance since it doesn’t convert the database results into full Mongoose models.

// On the other hand, .toObject() is used after retrieving a Mongoose document. It converts the document into a normal object but still carries extra Mongoose processing overhead.

// global middle ware handling

// how to define a dynamic variable by passing it as a paramter

function test(){
    const x = 10;
    x=30
    return x;
}

function catchError(fn){
    try{
        fn(); // dyncamic 

    }catch(error){
        console.log(error.message)
    }
}
catchError(test);

function test(a){
    const x = a;
    return x;
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