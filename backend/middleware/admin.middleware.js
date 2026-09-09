const isAdmin = (req, res, next) => {
    console.log("isAdmin middleware -user isAdmin:", req,user?.role);

    if(!req,user || req.user.role !== "admin") {
        console.log("isAdmin Failed - user is not admin or not logged in");
        return res.status(403).json({message: "Admin access only"});
    }

    console.log("isAdmin passed - user is admin");
    next();
}

module.exports = isAdmin;