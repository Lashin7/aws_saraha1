export const notFoundHandler = (req, res, next) => {
        next(new Error("API not Found", { cause: 404 }))
    }
