import { sequelize } from "../models/init-models"

const findAll = async (req,res)=>{
    try {
        const country = await req.context.models.countries.findAll()
        return res.send(country)
    } catch (error) {
        return res.status(404).send(error)
    }
}
const findRel = async (req,res)=>{
    try {
        const country = await req.context.models.countries.findAll({
            include : [{
                model : req.context.models.regions,
                as : "region",
                right : true
            
            }]
        })
        return res.send(country)
    } catch (error) {
        return res.status(404).send(country)
    }
}

const findOne = async (req,res)=>{  
    try {
        const country = await req.context.models.countries.findOne({
            where:{country_id : req.params.id}
        })
        return res.send(country)
    } catch (error) {
        return res.status(404).send(error)
    }
}

/*const create = async (req,res)=>{
    try {
        const country = await req.context.models.countries.create({
            country_id : req.body.country_id,
            country_name : req.body.country_name,
            region_id : req.body.region_id
        })
        return res.send(country)
    } catch (error) {
        return res.status(404).send(error)
    }
}*/

const create = async (req,res)=>{
    const cekReg =  req.regions
    try {
        const country = await req.context.models.countries.create({
            country_id : req.body.country_id,
            country_name : req.body.country_name,
            region_id : cekReg.region_id 
        })
        return res.send(country)
    } catch (error) {
        return res.status(404).send(error)
    }
}


const update = async (req,res)=>{
    try {
        const country = await req.context.models.countries.update({
            country_name : req.body.country_name
        },{ returning : true , where:{country_id : req.params.id}})
        return res.send(country)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
    try {
        const country = await req.context.models.countries.destroy({
            where:{country_id : req.params.id}
        })
        return res.send('delete '+country+' rows')
    } catch (error) {
        return res.status(404).send(error)
    }
}

const querySQL = async(req,res)=>{
    try {
        await sequelize.query('SELECT * from countries a join locations b on a.country_id = b.country_id where a.country_id = :countryId',
        {replacements : {countryId : req.params.id},type : sequelize.QueryTypes.SELECT})
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
    update,
    deleted,
    querySQL
}