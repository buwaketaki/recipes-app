const path = require('path');

const express = require('express');

const router = express.Router();

const fetch = require("node-fetch");
const axios = require('axios');
const appkey = "8c270b26b309974a2e1ffad14cf20c0b";
const appid = "b2673545"
const recipes = []

// /admin/add-product => POST
router.post('/add-recipe', (req, res, next) => {
  var p = req.body.search
  
  const recipe = makeGetRequest(p);
  console.log(typeof(recipes))
  /*console.log(req.body.search);*/
  console.log(p)
  console.log("ketaki");
  
  res.render('show',{
    recipe,
    pageTitle : "Recipes"
  });
});

router.get('/add-recipe', (req, res, next) => { 
  res.render('index', {
    recipes,
    path: '/admin/add-recipe',
    pageTitle: 'index',
  });
});

const makeGetRequest = async (p)=>{
  try {
    let res = await axios.get(`https://api.edamam.com/search?q=${p}&app_id=${appid}&app_key=${appkey}`);
    const data = res.data.hits;
    console.log(typeof(data));
    
    
    return data;
  }catch(error){
    console.log(error);
    return null;
  }  
}

module.exports = router;