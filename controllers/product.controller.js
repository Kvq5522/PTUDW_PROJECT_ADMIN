const products = require('../models/Product.model');

const getProductPage = (req, res) => {
    products.Product.find({}, (err, data) => {        
        if (err) {
            console.log(err);
            res.status(500).send('Internal Error');
        } 
        
        res.render('product', { productList: data });
    });
}

const getSubmitPage = (req, res) => {
    res.render('submit');
}

const submitProduct = (req, res) => {
    const { productName, productPrice, productColor, productDescription, dataUrl } = req.body;

    const newProduct = new products.Product({
        name: productName,
        price: isNaN(productPrice) ? 0 : productPrice,
        color: productColor,
        description: productDescription,
        image_url: dataUrl
    });

    newProduct.save();
    res.redirect('/product');
}

const deleteProduct = (req, res) => {
    const { productID } = req.params;

    products.Product.deleteOne({ _id: productID }, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Error');
        } else {
            res.redirect('/product');
        }
    });
}

module.exports = {
    getProductPage,
    getSubmitPage,
    submitProduct,
    deleteProduct
}