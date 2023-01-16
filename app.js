const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3004;
const ip='10.198.188.116';
const claimsRouter = require('./src/routes/claims.route');
const userRouter = require('./src/routes/users.route');
const adminRouter = require('./src/routes/admins.route');

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({ 'message': 'ok' });
})

app.use('/claims', claimsRouter);

app.use('/user', userRouter);

app.use('/admin', adminRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ 'message': err.message });
  return;
});

app.listen(port, ip, () => {
  console.log(`Example app listening at ${ip}:${port}`)
});
