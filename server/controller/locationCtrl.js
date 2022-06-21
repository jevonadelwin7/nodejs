import { sequelize } from "../models/init-models"

const findAll = async (req,res)=>{
    try {
        const location = await req.context.models.locations.findAll()
        return res.send(location)
    } catch (error) {
        return res.status(404).send(error)
    }
}
const findRel = async (req,res)=>{
    try {
        const location = await req.context.models.locations.findAll({
            include : [{
                model : req.context.models.departments,
                as : "departments",
                left : true
            }]
        })
        return res.send(location)
    } catch (error) {
        return res.status(404).send(error)
    }
}
const findOne = async (req,res)=>{  
    try {
        const location = await req.context.models.locations.findOne({
            where:{location_id : req.params.id}
        })
        return res.send(location)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async (req,res)=>{
    try {
        const location = await req.context.models.locations.create({
            location_id : req.body.location_id,
            street_address : req.body.street_address,
            region_id : req.body.region_id,
            country_id : req.body.country_id,
        })
        return res.send(location)
    } catch (error) {
        return res.status(404).send(error)
    }
}
const createNext = async (req,res,next )=>{
    try {
        const location = await req.context.models.locations.create({
            location_id : req.body.location_id,
            street_address : req.body.street_address,
            region_id : req.body.region_id,
            country_id : req.body.country_id,
        })
        req.locations = location
        next()
    } catch (error) {
        return res.status(404).send(error)
    }
}


const update = async (req,res)=>{
    try {
        const location = await req.context.models.locations.update({
            location_name : req.body.location_name
        },{ returning : true , where:{location_id : req.params.id}})
        return res.send(location)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
    try {
        const location = await req.context.models.locations.destroy({
            where:{location_id : req.params.id}
        })
        return res.send('delete '+location+' rows')
    } catch (error) {
        return res.status(404).send(error)
    }
}

const querySQL = async(req,res)=>{
    try {
        await sequelize.query('select * from locations a join countries b on a.country_id = b.country_id where location_id = :locationId',
        {replacements : {locationId : req.params.id},type : sequelize.QueryTypes.SELECT})
        .then(result =>{
            return res.send(result)
        })
    } catch (error) {
        return res.status(404).send(error)
    }
}

export default {
    findAll,
    findRel,
    findOne,
    create,
    createNext,
    update,
    deleted,
    querySQL
}