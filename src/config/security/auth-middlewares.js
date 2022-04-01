const isAuth = (req, res, next) => {
    if (req.session?.user) {
        console.log(req.session.user)
        console.log(req.session)
        return next()
    } else {
        res.redirect('/login.html')
    }
}


module.exports = { isAuth }