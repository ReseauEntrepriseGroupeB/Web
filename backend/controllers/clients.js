const Client = require("../models/clients");
const Op = require("sequelize");
const cron = require('node-cron');
const Sequelize = require("sequelize");
var moment = require('moment');


const clients = async (req, res) => {
    const users = await Client.findAll(
        {attributes: ['id', 'email', 'nom', 'dateRDV']});

    if (users.length === 0)
        return res
            .status(404)
            .json({message: "No Users found in the database"});
    res
        .status(200)
        .json({clients: users});
};

const createClient = async (req, res) => {

    const reqBody = {...req.body};

    await Client.create(reqBody);

    return res
        .status(200)
        .json({client: reqBody});
};

const getDate = async (req, res) => {

    const reqBodyDate = req.params.date;

    const t = await Client.findAll(
        {
            where:
                {
                    dateRDV:
                        {$between: [reqBodyDate + ' 00:00:00.000000 +00:00', +reqBodyDate + ' 23:59:59.000000 +00:00']}
                }
        });

    const result = await Client.findAll(
        {
            attributes: ['nom', 'dateRDV', 'email']
        });

    const filterredDates = result
        .filter(x => (new Date(x.dateRDV).getFullYear()).toString() === reqBodyDate.split('-')[0]
        && (new Date(x.dateRDV).getMonth() + 1).toString() === reqBodyDate.split('-')[1]
        && (new Date(x.dateRDV).getDate()).toString() === reqBodyDate.split('-')[2])
        .map(x => new Date(x.dateRDV).getHours() - 1);

    let set = new Set();
    filterredDates.forEach(x => set.add(x));
    return res
        .status(200)
        .json({rdv: Array.from(set)});
};

function dayDiff(d1, d2) { return new Number((d2.getTime() - d1.getTime()) / 31536000000).toFixed(0); }

cron.schedule('* * 24 * * *', async function() {
    const time = await Client.findAll()
    time.forEach(x => {
        const day1 = new Date(x.dataValues.createdAt);
        const day2 = new Date();
        x.diff = dayDiff(day1, day2);
    });
    const timefiltered = time.filter(x => x.diff > 3).map(x => x.id)

    Client.destroy({ where: { id: [...timefiltered] }})

    });



module.exports = {
    clients, createClient, getDate
};
