const app = require('./app');

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('App listening on port %s', port);
});