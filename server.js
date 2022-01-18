// l'appel des librairies externes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');


 



// Moteur de template
app.set('view engine', 'ejs')


// Middlewares
app.use('/assets', express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



//Initialisation des cookies/sessions
app.use(session({
    secret: 'tretrelolo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use (require('./middlewares/flash'))




// routes
app.route('/')

    // Methode get pour cette route ('/')
    .get((req, res) => {

    
        const Message = require('./models/message')
        Message.all(function (messages) {

            res.render('pages/index', {messages: messages})
        })

    })

    // Methode post pour cette route ('/')
    .post((req, res) => {
        if (req.body.message === undefined || req.body.message === '') {
            console.log(req.body);
            req.flash('error', "Vous n'avez pas posté de message.")

            res.redirect('/')

        } else {

            const Message = require('./models/message')
            console.log(req.file + ' aaaaaaaaaaaa');
            console.log(req.body);
            
            Message.create(req.body.message, req.body.firstname, req.body.lastname, function() {

                req.flash('success', 'Merci !')

                setTimeout(function () {
                    // after 0.5 seconds
                    res.redirect('/')
                 }, 500)
                
            })
        }

    })

    // pour voir un message en particulier
app.get('/message/:id', (req, res) => {
    let Message = require('./models/message')
    
    Message.find(req.params.id, function(message) {

        res.render('messages/show', {message: message})

    })
})

    // route de suppression d'un message
app.get('/delete/:id', (req, res) => {
    let Message = require('./models/message')

    Message.delete(req.params.id, function() {

        req.flash('success', 'Votre message à ete supprimé avec succès !')

        res.redirect('/')
        // res.render('delete/confirm')
    })
})

    // route de pré-édition d'un message (permet d'afficher le formulaire d'edition du message)
app.get('/pre-edit/:id', (req, res) => {
    const Message = require('./models/message')
    Message.all(function (messages) {
        res.render('pages/index', {edit: true, id: req.params.id, messages: messages})
    })

})

    // route dédiée à la modification du message précedement en pré-édition.
app.post('/edit/:id', (req, res) => {
    const Message = require('./models/message')
    Message.edit(req.body.message, req.params.id, function() {
        req.flash('success', 'Modification effectuée !')

        res.redirect('/')

    })
})

// port sur lequel l'app écoute.
app.listen(8000);