import joi from "joi"


// data
const person = {
    name: "ed",
    age: 10, // default cast numeric string string
    email: "agmaed@yahoo.com",
    isMarried: false,
    password: "123456",
    confirmePassword: "123456",
    skills: ["HTML", "CSS"],
    skill2: { frontEnd: ["Html", "CSS"] },
    test:"gomaa"

}


// schema (expected rules guidline)
const schema = joi.object({
    name: joi.string().min(3).max(7).required(),
    age: joi.number().min(18).max(80),
    email: joi.string().email().required(),
    isMarried: joi.boolean(),
    password: joi.string().required(),
    confirmePassword: joi.string().valid(joi.ref("password")).required(), // has to be similar to password
    skills: joi.array().items(joi.string().required()).required(),
    skills2: joi.object({
        frontEnd: joi.array().items(joi.string().required()).required()

    }).required()

}).required() // for the object (person)
.unknown() // if the i put keys not defined in the schema, skip the error


// validate
const result = schema.validate(person, { abortEarly: false });
console.log(result)
// convert 

