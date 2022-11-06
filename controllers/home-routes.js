const router = require('express').Router();
const { post , user } = require('../models');

router.get('/', async(req,res) => {
    try {
        res.render('homepage');
    } catch {

    }
});

router.get('/login', async(req,res) => {
    try {
        res.render('login');
    } catch {

    }
});

router.get('/signup', async(req,res) => {
    try {
        res.render('register');
    } catch {

    }
});

module.exports = router;