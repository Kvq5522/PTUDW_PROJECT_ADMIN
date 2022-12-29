const products = require('../models/Product.model');
const qs = require('qs');

const getProductPage = async (req, res) => {  
    const {sort, color, priceRange, sortValue, ...withoutFilter} = req.query;
    const maxItem = 9;

    const nameFilter = withoutFilter.name ?? ''; 
    const colorFilter = color ?? '';
    const sortFilter = sort ?? 'name';
    const lowPivot = priceRange ? Number(priceRange.split('-')[0]) : 0;
    const highPivot = priceRange ? Number(priceRange.split('-')[1]) : 1e9;
    const sortValueFilter = sortValue ? Number(sortValue) : 1;  
    const maxPage = Math.ceil(await products.Product.countDocuments({name: {'$regex': nameFilter, '$options': 'i'}, 
    color: {'$regex': colorFilter}, price: {$gte: lowPivot, $lte: highPivot}}) / maxItem);
    const curPage = req.query.page ? Number(req.query.page) : 1; 
    let queryString = ""; 
    for (i in req.query) {
        if (i != "page") {
            queryString += `${i}=${req.query[i]}&`;
        }
    }
    const pagination = {
        curPage: curPage,
        maxPage: maxPage,
        nextPage: curPage < maxPage ? curPage + 1 : maxPage,
        prevPage: curPage > 1 ? curPage - 1 : 1,
        curQuery: queryString
    } 

    products.Product.find({name: {'$regex': nameFilter, '$options': 'i'}, color: {'$regex': colorFilter, '$options': 'i'}, 
    price: {$gte: lowPivot, $lte: highPivot}}).limit(maxItem).skip((pagination.curPage - 1) * maxItem).sort([[`${sortFilter}`, sortValueFilter]])
    .exec((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.render('product', { productList: data, originalUrl: `${req.baseUrl}?${qs.stringify(withoutFilter)}`, pagination: pagination});
    });
}

const getProductAPI = async (req, res) => {
    const {sort, color, priceRange, sortValue, ...withoutFilter} = req.query;
    const maxItem = 9;

    const nameFilter = withoutFilter.name ?? ''; 
    const colorFilter = color ?? '';
    const sortFilter = sort ?? 'name';
    const lowPivot = priceRange ? Number(priceRange.split('-')[0]) : 0;
    const highPivot = priceRange ? Number(priceRange.split('-')[1]) : 1e9;
    const sortValueFilter = sortValue ? Number(sortValue) : 1;  
    const maxPage = Math.ceil(await products.Product.countDocuments({name: {'$regex': nameFilter, '$options': 'i'}, 
    color: {'$regex': colorFilter}, price: {$gte: lowPivot, $lte: highPivot}}) / maxItem);
    const curPage = req.query.page ? Number(req.query.page) : 1; 

    let query = qs.stringify(req.query, { encode: false });
    query = query.substring(0, query.indexOf('page') - 1);

    const pagination = {
        curPage: curPage,
        maxPage: maxPage,
        nextPage: curPage < maxPage ? curPage + 1 : maxPage,
        prevPage: curPage > 1 ? curPage - 1 : 1,
        curQuery: query
    } 

    products.Product.find({name: {'$regex': nameFilter, '$options': 'i'}, color: {'$regex': colorFilter, '$options': 'i'}, 
    price: {$gte: lowPivot, $lte: highPivot}}).limit(maxItem).skip((pagination.curPage - 1) * maxItem).sort([[`${sortFilter}`, sortValueFilter]])
    .exec((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.send({productList: data, pagination: pagination});
    });
};

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
            res.status(500).send({message: 'Internal Server Error'});
        } else {
            res.send({message: 'success'});
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

        res.render('product_detail', {detail: data})
    });
};

const editProduct = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    const { productName, productPrice, productColor, productDescription, productAvailable ,dataUrl } = req.body;
    const { productID } = req.params;

    products.Product.findById(productID, async (err, data) => {
        if (err) {
            console.log(err);
                res.status(500).send('Internal Server Error');
            return;
        }

        data.name = productName ? productName : data.name;
        data.price = isNaN(productPrice) ? parseFloat(productPrice) : data.price;
        data.color = productColor ? productColor : data.color;
        data.description = productDescription ? productDescription : data.description;
        data.image_url = dataUrl ? dataUrl : data.image_url;
        data.available = productAvailable === 'True' ? true : false;

        await data.save();

        res.render('product_detail', {detail: data});
    });
};

module.exports = {
    getProductPage,
    getProductAPI,
    getSubmitPage,
    submitProduct,
    deleteProduct,
    getProductDetailPage,
    editProduct
}