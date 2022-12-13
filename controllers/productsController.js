const express = require('express');
const Products = require('../models/Products')
const Categories = require('../models/Categories')
const Inbox = require('../models/Inbox')


const getAllproducts = async function(req, res, next){
    let url = require('url');
    let categorie = url.parse(req.url,true).query.categorie;
    const [products,_] = await Products.getAllProducts();
    let listProducts = [];
    if(categorie){
        console.log('with params'); 
    }else{
        console.log('no params');
    }
    for(i=0;i<products.length;i++){
        var [category, __] = await Categories.getCategoryById(products[i].category_id);
        products[i]['category'] = category;
        listProducts.push(products[i]);
    }
    res.json({count: listProducts.length, products: listProducts})
}


const getProductById = async function(req, res, next){
    let postId = req.params.id;
    let productOutput = [];
    const [product, _] = await Products.getProductById(postId);
    let [category, __] = await Categories.getCategoryById(product[0].category_id);
    let [inbox, ___] = await Inbox.getInboxByProduct(product[0].id);
    product[0]['category'] = category;
    product[0]['inbox'] = inbox;
    productOutput.push(product[0]);
    res.json({product: productOutput});
}


module.exports = {
    getAllproducts, 
    getProductById
}