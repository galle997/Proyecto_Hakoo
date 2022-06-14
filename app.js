import  path  from 'path';
import { fileURLToPath } from 'url';
import createError from 'http-errors';
import express, { json, urlencoded} from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import logger from 'morgan';
import autenticar from './utils/autenticar.js'

import { crearRutas } from './routes/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extends: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Inyectar el usuario leyendo el authToken de las cookies
app.use((req, res, next) => {
  //obtener el token de las cookies
  const authToken = req.cookies['AuthToken'];
  //inyectar el usuario al request
  req.user = autenticar.authTokens[authToken];
  next();
})

//añadiendo rutas
crearRutas(app) 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
