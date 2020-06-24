module.exports = {
    error404: function (req, res, next) {
        res.status(404).send('404 NOT FOUND');
    },

    error500: function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('500 SERVER ERROR');
    }
}