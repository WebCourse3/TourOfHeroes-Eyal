let express = require("express");
let router  = express.Router();


const cont = require('../controller/heroes');
let ctrl =  new cont.controller();

// GET all heroes
router.get('/', function(req, res){
    res.send(ctrl.getHeroes());
});

// GET hero by id
router.get('/:id', function(req, res){
    let id;
    try{
        id = parseInt(req.params.id);
    }
    catch (e){
        console.log(e);
        res.send("bad JSON");
    }
    res.send(ctrl.getHeroById(id));
});

// PUT (update) hero by id
router.put('/:id', function(req, res){
    let id;
    let name;
    try{
        id = parseInt(req.params.id);
        name = req.body.name;
    }
    catch (e){
        console.log(e);
        res.send("bad JSON");
    }

    ctrl.updateHero(id,name);
    res.send(ctrl.getHeroes());
});

// POST new hero (data in body)
router.post('/', function (req,res) {
    let id;
    let name;

    try{
        id = parseInt(req.body.id);
        name = req.body.name;
    }
    catch (e){
        console.log(e);
        res.send("bad JSON");
    }

    ctrl.addHero(id,name);

    res.send(ctrl.getHeroes());
});

// DELETE hero by id
router.delete('/:id', function (req, res) {
    let id;
    try{
        id = parseInt(req.params.id);
    }
    catch (e){
        console.log(e);
        res.send("bad JSON");
    }
    ctrl.delHero(ctrl.getHeroById(id));
    res.send(ctrl.getHeroes());
});

// DELETE hero by name. Example: /?name=hero1
router.delete('/', function (req,res) {

    let name;
    try{
        name = req.query.name;
    }
    catch (e){
        console.log(e);
        res.send("bad JSON");
    }

    ctrl.delHero(ctrl.getHeroByName(name));
    res.send(ctrl.getHeroes());
});

module.exports = router;