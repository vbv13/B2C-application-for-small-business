let admin = (req, res, next) => {
    if(req.user.role === 0) {
        return res.send('Nie wpuścimy Cię');
    }
    next();
}

module.exports = { admin }