module.exports = function(res, status, obj) {
    res.status(status).json(obj);
}
