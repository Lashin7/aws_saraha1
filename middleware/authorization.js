const isAuthorized = (roles) => {
    // 2 (roles) user role ,, (endpoint role)
    // admin >> endpoint to access profile(user)
    // req.user
    return (req, res, next) => {
        // 2 (roles) user role ,, (endpoint role)
        // admin >> endpoint to access profile(user)
        // req.user
        if (!roles.includes(req.user.role)) return next(new Error("not authotized", { cause: 400 }))
        return next();

    }
}
export default isAuthorized;