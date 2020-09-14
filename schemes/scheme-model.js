const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find(){
    return db("schemes");
}

function findById(id){
    return db("schemes").where({id: id}).first();
}

function findSteps(id){
    return db("steps")
    .where({"schemes.id": id})
    .join("schemes", "steps.scheme_id", "schemes.id")
    .select("steps.id", "scheme_name", "steps.step_number", "instructions")
    .orderBy("step_number");
}

function add(scheme){
    return db("schemes")
    .insert(scheme)
    .then(schemeId=>{
        return {
            id: schemeId[0],
            ...scheme
        }
    })
}

function update(changes, id){
    return db("schemes")
    .update(changes)
    .where({id: id})
    .then(schemeId=>{
        return {
            id: id,
            ...changes
        }
    })
}

function remove(id){
    return db("schemes")
    .where({id: id})
    .first()
    .then(scheme=>{
        if(!scheme) return null;
        return db("schemes")
        .where({id: id})
        .del()
        .then(rowsDeleted=>{
            return scheme;
        })
    })
}