import { sequelize } from "../models/init-models"

const findAll = async (req,res)=>{
    try {
        const employee = await req.context.models.employees.findAll()
        return res.send(employee)
    } catch (error) {
        return res.status(404).send(error)
    }
}
const findOne = async (req,res)=>{      
    try {
        const employee = await req.context.models.employees.findOne({   
            where:{employee_id : req.params.id}
        })
        return res.send(employee)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async (req,res)=>{
    try {
        const employee = await req.context.models.employees.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            relationship : req.body.relationship,
            employee_id : req.body.employee_id,
            department_id: req.body.department_id
        })
        return res.send(employee)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const update = async (req,res)=>{
    try {
        const employee = await req.context.models.employees.update({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            relationship : req.body.relationship,
            job_id : req.body.job_id,
            department_id: req.body.department_id
            
        },{ returning : true , where:{employee_id : req.params.id}})
        return res.send(employee)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
    try {
        const employee = await req.context.models.employees.destroy({
            where:{employee_id : req.params.id}
        })
        return res.send('delete '+employee+' rows')
    } catch (error) {
        return res.status(404).send(error)
    }
}

const querySQL = async(req,res)=>{
    try {
        await sequelize.query('select a.employee_id,a.first_name, a.last_name, b.max_salary, b.min_salary from employees a join jobs b on a.job_id =  b.job_id where employee_id =:employeeId',
        {replacements : {employeeId : req.params.id},type : sequelize.QueryTypes.SELECT})
        .then(result =>{
            return res.send(result)
        })
    } catch (error) {
        return res.status(404).send(error)
    }
}

export default {
    findAll,
    findOne,
    create,
    update,
    deleted,
    querySQL
}