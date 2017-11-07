let data = require('../model/data');

class Controller {
    constructor(){
        this.dt = data.heroes_database;
    }

    getHeroes() {
        return this.dt;
    }

    getHeroById(id) {
        for (let i = 0; i < this.dt.length; i++) {
            if (parseInt(this.dt[i].id) === id) {
                return this.dt[i];
            }
        }
    }

    getHeroByName(name) {
        for (let i = 0; i < this.dt.length; i++) {
            if (this.dt[i].name.toLowerCase() === name.toLowerCase()) {
                return this.dt[i];
            }
        }
    }

    addHero(id,name) {
        let hero = this.getHeroById(id);
        let index = this.dt.indexOf(hero);
        if (index === -1) {
            this.dt.push({"id": id, "name": name});
        }
    }

    delHero(hero) {
        let index = this.dt.indexOf(hero);
        this.dt.splice(index,1);
    }

    updateHero(id,new_name){
        let hero = this.getHeroById(id);
        let index = this.dt.indexOf(hero);
        this.dt[index].name = new_name;
    }
}

module.exports.controller = Controller;