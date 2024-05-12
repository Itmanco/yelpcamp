const User = require('../models/user');

module.exports.renderRegister = (req,res)=>{
    res.render(`users/register`);
}

module.exports.register = async (req,res, next)=>{
    try {
        const {username,password, email} = req.body.user;    
        const user = new User({email,username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!')
            res.redirect('/campgrounds');
        })
    } catch (err) {
        if (err.keyValue.email != null && err.code === 11000){            
            req.flash('error', 'The current email is already registered.');
        } else {
            req.flash('error', err.message);
        }

        return res.redirect('/register')
    }
}

module.exports.renderLogin = (req,res)=>{
    res.render(`users/login`);
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds'; // update this line to use res.locals.returnTo now
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res)=>{    
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}
