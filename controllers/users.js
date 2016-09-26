function newUser(req, res) {
    var user = {
        username: '',
        email: '',
        password: '',
        wallet: ''
    };
    res.render('users/new', {
        title: 'Register',
        user: user
    });
}

function loginUser(req, res) {
    var user = {
        username: '',
        password: ''
    };
    res.render('users/login', {
        title: 'Register',
        user: user
    });
}

// function createUser(req, res) {
//     User.create(req.body,
//         function(err, user) {
//             if (err) req.flash('error', err.message);
//             res.redirect('/');
//         });
// }

module.exports = {
    // create: createUser,
    login: loginUser,
    new: newUser
};
