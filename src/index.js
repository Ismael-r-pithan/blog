const express = require('express')
const session = require('express-session');
const { getConnection } = require('./db/database')
const dotenv = require('dotenv')

const app = express()

dotenv.config()

const port = process.env.PORT || 3000

app.set('views', './src/views')
app.set('view engine', 'ejs')


app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use(session({
  secret: 'CHAVE DA APLICAÇÃO',
  resave: false,            // FORÇA O SALVAR DA SESSION MESMO QUE NÃO MODIFICADA
  saveUninitialized: true,  // SALVAR UMA SESSION QUE NÃO INICIALIZADA
  cookie: { secure: false } // HTTP / HTTPS
}));


app.get('/', (req, res) => {
    res.redirect('/posts')
})

// app.get('/', (req, res) => {
//     res.render('home')
// });

const postRoutes = require('./routes/post-routes')
app.use('/posts', postRoutes)

const userRoutes = require('./routes/user-routes')
app.use('/users', userRoutes)

const authRoutes = require('./config/security/auth-routes')
app.use(authRoutes)

app.use('*', (req, res) => {
    res.redirect('/');
})


app.listen(port, ()=>{console.log(`server listenen port ${port}`)})

getConnection();