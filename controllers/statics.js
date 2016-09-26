// INDEX
function indexHome(req, res) {
    res.render('statics/index', {title: "Poker Game"});
}

module.exports = {
    index: indexHome
}
