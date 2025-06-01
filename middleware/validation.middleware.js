// In a closure-based approach, the outer function (or "main function") receives specifications or configurations, while the inner function operates on a variable using those specs.
//  Using closures allows us to create dynamic specifications that can be adjusted based on different contexts, rather than hardcoding rules. That way, your validation logic is flexible and reusable

//- Outer function → Receives fixed values that should be remembered (configuration, settings, constants).
// - Inner function → Receives dynamic values that change with each execution (user input, request data, event details).

// Closures are useful when you need to pass dynamic arguments to middleware at the time of route definition. 
// - Fixed values → Belong in the outer function (these don’t change within the function’s execution).
// - Flexible values → Belong in the inner function (these change each time the function runs).

import { Types } from "mongoose";

const validation = (schema) => {  // to make the specs dynamic
    return (req, res, next) => { // middleware
        // types of data ,, body params query
        const data = { ...req.body, ...req.query, ...req.params }
        const result = schema.validate(data, { abortEarly: false });
        // if >> schema.body (req.body) schema.query(req.query)  .. if i define the body and query and param seperataly 
        if (result.error) {
            const messageList = result.error.details.map((obj) => obj.message);
            return next(new Error(messageList), { cause: 400 })
        }
        return next()
    }
}
export const isValidObjectId = (value, helper) => {
        // check if the value is objectId
        // yes 
        if (Types.ObjectId.isValid(value)) return true;
        // no
        return helper.message("Invalid ObjectId!")
    }
export default validation;