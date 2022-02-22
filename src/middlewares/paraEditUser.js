function paraEditUser(req, res, next) {
    if (req.session.userLogged) {
        return res.redirect('/editarusuario/:id');
    }
    next();
}

module.exports = paraEditUser;