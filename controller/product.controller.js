const getProductPage = (req, res) => {
    res.render('product');
}

const getSubmitPage = (req, res) => {
    res.render('submit');
}

module.exports = {
    getProductPage,
    getSubmitPage
}