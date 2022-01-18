// middleware permettant de gerer les messages flash de l'application afin de confirmer les actions de l'utilisateur ou de generer un message d'erreur ( utilisation des sessions)
module.exports = function (req, res, next) {

    if (req.session.flash) {
        res.locals.flash = req.session.flash

        req.session.flash = undefined
    }

    req.flash = function (type, content) {

        if (req.session.flash === undefined) {
            req.session.flash = {}
        }

        req.session.flash[type] = content
    }

    next()

}