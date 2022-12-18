const products = require('../models/Product.model');
const qs = require('qs');

const getProductPage = (req, res) => {  
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    const {sort, color, priceRange, sortValue, ...withoutFilter} = req.query;

    let nameFilter = withoutFilter.name ? withoutFilter.name : ''; 
    nameFilter = nameFilter.charAt(0).toUpperCase() + nameFilter.slice(1);
    let colorFilter = color ? color : '';
    let sortFilter = sort ? sort : 'name';
    let lowPivot = priceRange ? Number(priceRange.split('-')[0]) : 0;
    let highPivot = priceRange ? Number(priceRange.split('-')[1]) : 1e9;
    let sortValueFilter = sortValue ? Number(sortValue) : 1;    

    products.Product.find({name: {'$regex': nameFilter, '$options': 'i'}, color: {'$regex': colorFilter}, 
    price: {$gte: lowPivot, $lte: highPivot}}).sort([[`${sortFilter}`, sortValueFilter]]).exec((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.render('product', { productList: data, originalUrl: `${req.baseUrl}?${qs.stringify(withoutFilter)}` });
    });
}

const getSubmitPage = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    res.render('submit');
}

const submitProduct = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

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
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

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

const getProductDetailPage = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    const id = req.params.productID;

    products.Product.findById(id, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        products.Product.find({ color: data.color }).where('_id').ne(id).exec((err, listData) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');  
                return;
            }

            res.render('product_detail', { item: data, relatedList: listData});
        });
    });
};

module.exports = {
    getProductPage,
    getSubmitPage,
    submitProduct,
    deleteProduct,
    getProductDetailPage
}