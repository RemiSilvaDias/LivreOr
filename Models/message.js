const connection = require('../config/db')
const moment = require('../config/moment')



class Message {

    // constructeur de la class
    constructor (row) {
        this.row = row
    }


    // getter
    get content() {
        return this.row.content
    }

    get created_at() {
        return moment(this.row.created_at)
    }

    get id() {
        return this.row.id
    }

    get updated_at() {
        return moment(this.row.updated_at)
    }

    get firstname() {
        return this.row.firstname
    }

    get lastname() {
        return this.row.lastname
    }

    // Les diverses requetes vers la bdd
    // ajout d'un nouveau msg
    static create (content, firstname, lastname, cb) {
        connection.query('INSERT INTO messages SET content = ?, created_at = ?, firstname = ?, lastname = ?', [content, new Date(), firstname, lastname], (err, result) => {

            if (err) throw err
            cb(result)
        })
    }

    // selection de tous les messages du livre d'or
    static all (cb) {
        connection.query('SELECT * FROM messages ORDER BY id DESC', (err, rows) => {
            if (err) throw err
            
            cb(rows.map((row) => new Message(row)))
        })
    }

    // récupération d'un seul et unique message selon son id en bdd
    static find (id, cb) {
        connection.query('SELECT * FROM messages WHERE id = ? LIMIT 1', [id], (err, rows) => {

            if (err) throw err
            
            cb(new Message(rows[0]))
        })
    }

    // suppression d'un message selon son id en bdd
    static delete (id, cb) {
        connection.query('DELETE FROM messages WHERE id = ?', [id], (err, rows) => {
            if (err) throw err
            
            cb(new Message(rows[0]))
        })
    }

    // édition du contenu d'un message selon son id en bdd
    static edit (content, id, cb) {
        console.log(content, id)
        connection.query('UPDATE messages SET content = ?, updated_at = ? WHERE id = ?', [content,new Date(), id], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }
}

//export de la class pour s'en servir sur d'autres fichiers
module.exports = Message