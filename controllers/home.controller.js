const getHomePage = (req, res) => {
    res.render('index');
}

const getLoginPage = (req, res) => {
    res.render('login');
}

const postLoginPage = (req, res) => {
    res.render('product');
}

const getLogoutPage = (req, res) => {
    res.redirect('/');
}

module.exports = {
    getHomePage,
    getLoginPage,
    postLoginPage,
    getLogoutPage
}