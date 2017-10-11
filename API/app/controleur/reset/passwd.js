const db = require('../../db.js')
const nodemailer = require('nodemailer')

function genToken () {
  var str = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`
  var token = ''

  for (var count = 0; count < 128; count++) {
    token += str[Math.floor((Math.random() * str.length))]
  }
  return (token)
}
function error1 (res, status, message) {
  res.status(status)
  res.json({
    message: message
  })
}

module.exports = (req, res) => {
  if (req.body.mail !== '' && req.body.mail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    let hash = genToken()
    db.get().then((db) => {
      db.collection('Users').find({mail: req.body.mail}).toArray((err, result) => {
        if (err) return error1(res, 500, 'Internal server Erreur')
        if (result.length === 1) {
          db.collection('Users').updateOne({mail: req.body.mail}, {$set: {
              actif: false,
              hash: hash
            }
          })
          nodemailer.createTestAccount((err, account) => {
            if (err) return error1(res, 500, 'mail not send')
            let transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user: 'admmatcha@gmail.com', // generated ethereal user
                pass: 'Apwn789123'  // generated ethereal password
              }
            })
              let url = `http://localhost:3000/reset/resetpasswd/${hash}`
              let mailOptions = {
                from: '"Matcha Admin" <admmatcha@gmail.com>', // sender address
                to: result[0].mail, // list of receivers
                subject: 'Reset Passwd', // Subject line
                text: 'merci de cliquer sur l\'url pour reset votre Mdp', // plain text body
                html: `Hey,<b>Pour reset ton passwd clique <a href=${url}>ici</a></b>` // html body
              }
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) return error1(res, 500, 'mail not send')
                return res.json({
                  success: true,
                  message: 'mail send'
                })
              })
            })
        } else {
          return res.json({
            success: false
          })
        }
      })
    })
  }
}
