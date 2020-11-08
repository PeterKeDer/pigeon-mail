import http from 'http';
import createError from 'http-errors';
import express from 'express';
import 'regenerator-runtime';
import cors from 'cors';
import messageController from './controllers/messageController';
import userController from './controllers/userController';

const port = 8080;

const app = express();
const server = http.createServer(app);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/messages', messageController);
app.use('/user', userController);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('There was an error. Hmm')
});

server.listen(port, () => console.log(`Server started at http://localhost:${port}`));
