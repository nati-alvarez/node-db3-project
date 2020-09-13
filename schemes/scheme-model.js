const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
    find,
    findById,
    findSteps
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
