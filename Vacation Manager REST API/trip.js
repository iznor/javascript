const logger = require("./logger");
const dates = require("./data/dates.json");
const members = require("./data/members.json");

let choices=[];

//function to get a date object by id, from 'dates.json'
const getDate = (id)=> {
    const element=dates.find(x=>x.id==id)
    if(element)
        return element;
    else
        logger.log('info', `id ${id} does not exist`);
        return element;
}
//function to get a member object by id, from 'members.json'
const getMember = (id)=> {
    const element=members.find(x=>x.id==id)
    if(element)
        return element;
    else
        logger.log('info', `id ${id} does not exist`);
        return element;
    // return `id ${id} does not exist`;            
}

module.exports.getDate = getDate;
module.exports.getMember = getMember;
module.exports.choices = choices;