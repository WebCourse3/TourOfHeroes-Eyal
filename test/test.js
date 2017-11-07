const assert = require('assert');
const cont = require('../controller/heroes');

describe('Tour Of Heroes Tests', function() {
    describe('Hero API', function() {

        let ctrl =  new cont.controller();

        it('Add hero', function () {
            let before = ctrl.getHeroes().length;
            ctrl.addHero("4","hero4");
            let after = ctrl.getHeroes().length;
            assert.equal(1, after-before);
        });

        it('Delete hero', function () {
            let before = ctrl.getHeroes().length;
            ctrl.delHero(ctrl.getHeroById("4"));
            let after = ctrl.getHeroes().length;
            assert.equal(-1, after-before);
        });
    })
});