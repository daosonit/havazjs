const express = require('express')
const path = require('path')
const nunjucks = require('nunjucks')
const moment = require('moment')
const app = null

class Server {
  constructor () {
    this.app = express()
    this.middleware()
    this.views()
    this.http = require('http').Server(this.app)
    this.io = require('socket.io')(this.http)
    this.routes()
    this.createSocket()
  }

  createSocket () {
    this.io.on('connect', function (socket) {
      let data = moment(new Date()).format('DD/MM/Y HH:mm:ss')
      console.log('@@@socket:connect' + data)

      socket.on('InClient', (obj, callback) => {
        let dateNow = moment(new Date()).format('DD/MM/Y HH:mm:ss')

        console.log('@@@socket:InClient' + dateNow) // console.log(obj)
        console.log('@@@socket.id: ' + socket.id)
        // adicionar os dados do usuário no socket
        // socket.dataUser = obj

        // adicionar o cliente no array de online
        console.objClientOn[obj.email] = socket

        obj.msg = `${dateNow} Seja Bem Vindo  ${obj.nome}`
        // io.sockets.emit('chat message',objUser)
        console.objClientOn[obj.email].emit('chat message', obj)

        obj.msg = `${dateNow} Aguarde um atendente! `
        // io.sockets.emit('chat message',objUser)
        console.objClientOn[obj.email].emit('chat message', obj)

        console.log(`### objClientOn old => ${console.objClientOn.length}`)

        let boolExisteCli = false

        console.objClientOn.forEach(e => {
          if (e.nome === obj.nome && e.email === obj.email) {
            boolExisteCli = true
          }
        })

        if (!boolExisteCli) {
          console.objClientOn.push({
            nome: obj.nome,
            email: obj.email,
            empresa: obj.empresa,
            protocolo: '#RTSC#',
            msg: '#RTSC#'
          })
        }

        console.log('### objClientOn atual => ' + console.objClientOn.length)
      })

      socket.on('InEmployee', (objOp, callback) => {
        let dateNow = moment(new Date()).format('DD/MM/Y HH:mm:ss')
        console.log(`### InEmployee ${dateNow}`)
        console.log(JSON.stringify(objOp))

        // pegando o email do Employee após o login
        console.objEmployeePw.filter(c => {
          if (c.nome === objOp.nome && c.pass === objOp.pass) {
            objOp.email = c.email
            console.log('@@@ Pegou e-mail: ' + objOp.email)
          }
        })
        console.log(JSON.stringify(objOp))
        // Adicionando os dados do Employee em socket
        socket.dadosOp = objOp
        console.objEmployeeOn[objOp.email] = socket

        let exist = false

        console.objEmployeeOn.forEach(e => {
          if (e.nome === objOp.nome && e.email === objOp.email) {
            exist = true
          }
        })

        if (!exist) {
          console.objEmployeeOn.push({
            nome: objOp.nome,
            email: objOp.email,
            protocolo: '#RTSA#',
            msg: '#RTSA#'
          })
        }

        console.log(
          `### ADD objEmployeeOn : ${objOp.nome} = ${
            console.objEmployeeOn.length
          }`
        )

        objOp.msg = '###' + dateNow + ' Operador ' + objOp.nome + ' conectado!'
        socket.emit('chat message', objOp)
        // Fim
      })

      socket.on('chat message', (objUser, callback) => {
        let dateNow = moment(new Date()).format('DD/MM/Y HH:mm:ss')
        console.log(`@@@socket:chatMessage: ${dateNow}`) // console.log(obj)
        console.log(JSON.stringify(objUser))
        // inicio

        if (objUser.msg === '') {
          return false
        }

        /** metodo de envio universal */
        // io.emit('chat message', objUser);
        if (objUser.protocolo.search('#CTC#') !== -1) {
          /** * Possui no objeto o cliente * Possui no objeto o atendente */
          console.objClientOn[objUser.cliente].emit('chat message', objUser)

          objUser.msg = `${dateNow} Atende ${objUser.NomeAtendente} conectou!`

          if (console.objClientOn[objUser.cliente].connected) {
            console.objClientOn[objUser.cliente].emit('chat message', objUser)
          } else {
            console.log('#CTC# nao foi envia a mensagem...')
            console.log(objUser)
          }
        }

        if (objUser.protocolo.search('#MATC#') !== -1) {
          objUser.msg = ` ${dateNow} ${objUser.NomeAtendente} diz: ${
            objUser.msg
          }`

          if (console.objClientOn[objUser.cliente].connected) {
            console.objClientOn[objUser.cliente].emit('chat message', objUser)
          } else {
            console.log('#MATC# nao foi envia a mensagem...')
            objUser.protocolo = '#MCTA#'
            objUser.msg = 'nao foi envia a mensagem... usuário desconectou'
            console.objEmployeeOn[objUser.atendente].emit(
              'chat message',
              objUser
            )
          }
        }

        if (objUser.protocolo.search('#MCTA#') !== -1) {
          objUser.msg = `${dateNow} ${objUser.nome} diz: ${objUser.msg}`
          if (console.objEmployeeOn[objUser.atendente].connected) {
            console.objEmployeeOn[objUser.atendente].emit(
              'chat message',
              objUser
            )
          } else {
            console.log('#MCTA# nao foi envia a mensagem...')
            objUser.protocolo = '#MATC#'
            objUser.msg = 'nao foi envia a mensagem... ATENDENTE desconectou!'
            console.objClientOn[objUser.email].emit('chat message', objUser)
          }
        }

        /** Requisição para servidor atendimento */
        if (objUser.protocolo.search('#RTSA#') !== -1) {
          console.log('### RTSA online:  ' + console.objEmployeeOn.length)

          console.objEmployeeOn.forEach(c => {
            c.dadosOp.msg = '#RTSA#'
            c.dadosOp.protocolo = '#RTSA#'
            // objAtendentesOn.push(c.dadosOp);
            // io.emit('chat message', objAtendentesOn);
            // objClerksOn[objUser.email].emit('chat message', c);
            console.log(JSON.stringify(c.dadosOp))
            this.io.sockets.emit('chat message', c.dadosOp)
          })
        }

        /** Requisição para servidor clientes */
        if (objUser.protocolo.search('#RTSC#') !== -1) {
          console.log(`### #RTSC# online: ${console.objClientOn.length}`)

          console.objClientOn.forEach(c => {
            c.msg = '#RTSC#'
            c.protocolo = '#RTSC#'
            // objClientesOn.push(c.dadosUsuario);
            console.objClientOn[objUser.email].emit('chat message', c)
          })
        }

        /** para mandar para um cliente especifico */
        // console.log(objPersonOn)
        // objPersonOn['alisson@ineltec.com.br'].emit('chat message', objUser);
        // fim
      })

      socket.on('disconnect', function (obj) {
        // this.io.sockets.emit('chat message', { msg: 'user disconnected' })
        console.log('### event disconnect => ' + obj)
        console.log(socket.id)

        /*
        let newEmployeeOn = console.objEmployeeOn.filter(item => {
          console.log(console.objEmployeeOn[item.email].id)

          if (console.objEmployeeOn[item.email].id !== socket.id) {
            return item
          }
        })

        console.log(newEmployeeOn)
        console.objEmployeeOn = newEmployeeOn

        let newClientOn = console.objClientOn.filter(item => {
          console.log(console.objClientOn[item.email].id)
          if (console.objClientOn[item.email].id !== socket.id) {
            return item
          }
        })
        console.log(newClientOn)
        console.objClientOn = newClientOn
        */
      })
    })

    setInterval(() => {
      this.io.sockets.emit('chat message', console.objEmployeeOn)
      this.io.sockets.emit('chat message', console.objClientOn)
    }, 10000)
  }

  middleware () {
    /* Arquivos que toda aplicação ira utilizar */
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(
      '/public/angular',
      express.static(path.resolve(__dirname, 'public', 'angular'))
    )
    this.app.use(
      '/public/jquery',
      express.static(path.resolve(__dirname, 'public', 'jquery'))
    )
    this.app.use(
      '/public/styles',
      express.static(path.resolve(__dirname, 'public', 'styles'))
    )
  }

  views () {
    /** configuração da view */
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      autoescape: true,
      express: this.app,
      watch: true
    })

    this.app.set('view engine', 'njk')
  }

  routes () {
    this.app.use('/api/backoffice', require(path.resolve('./routes/backoffice/index.js')))
    this.app.use('/api/website', require(path.resolve('./routes/website/index.js')))
    this.app.use('/api/system', require(path.resolve('./routes/system/index.js')))
    this.app.use('/api/agency', require(path.resolve('./routes/agency/index.js')))
    this.app.use('/api/mobile/v1', require(path.resolve('./routes/mobile/v1/index.js')))
  }
}

module.exports = new Server().http