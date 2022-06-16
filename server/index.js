import dotenv from "dotenv"
import express from "express"
dotenv.config()

const Pool = require('pg').Pool;
const pool = new Pool({
    host : "localhost",
    user : "postgres",
    password  : "admin123",
    database : "HR",
    port : 5432
})

const app = express()
app.use(express.json())

const port = process.env.PORT || 3003

app.listen(port,()=>{console.log('Server listening on port '+port)})


//-------------------------------------------REGION-------------------------------------------------------
app.get('/api/region',(req,res)=>{
    pool.query('select * from regions',
    [],
    (error,result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/region/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from regions where region_id = $1',
    [id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/region/',(req,res)=>{
    const {region_name} = req.body
    pool.query('insert into regions (region_name) values ($1)',
    [region_name],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/region/:id',(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    pool.query("update regions set region_name=$1 where region_id=$2",
    [name,id],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.delete('/api/region/:id',(req,res)=>{
    const {id} = req.params
    pool.query('delete from regions where region_id = $1',
    [id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

//-----------------COUNTRIES-----------------

app.get('/api/countries',(req,res)=>{
    pool.query('select * from countries',
    [],
    (error,result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/countries/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from countries where country_id = $1',
    [id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/countries/',(req,res)=>{
    const{country_id} = req.body
    const {country_name} = req.body
    const {region_id} = req.body
    pool.query('insert into countries (country_id, country_name, region_id) values ($1,$2,$3)',
    [country_id,country_name,region_id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/countries/:id',(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    pool.query("update countries set country_name=$1 where country_id=$2",
    [name,id],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.delete('/api/countries/:id',(req,res)=>{
    const {id} = req.params
    pool.query('delete from countries where country_id = $1',
    [id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

//----------------Locations-----------------
app.get('/api/locations',(req,res)=>{
    pool.query('select * from locations',
    [],
    (error,result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/locations/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from locations where location_id = $1',
    [id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})
app.post('/api/locaions/',(req,res)=>{
    const {location_id} = req.body
    const {street_address} = req.body
    const {city} = req.body
    const {country_id} = req.body
    pool.query('insert into locations (location_id,street_address,city,country_id) values ($1,$2,$3,$4)',
    [location_id,street_address,city,country_id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/locations/:id',(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    pool.query("update locations set street_address=$1 where location_id=$2",
    [name,id],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.delete('/api/locations/:id',(req,res)=>{
    const {id} = req.params
    pool.query('delete from locations where location_id = $1',
    [id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

//----------Departments----------

app.get('/api/departments',(req,res)=>{
    pool.query('select * from departments',
    [],
    (error,result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/departments/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from departments where department_id = $1',
    [id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})
app.post('/api/departments/',(req,res)=>{
    const {department_name} = req.body
    const {location_id} = req.body
    pool.query('insert into departments (department_name,location_id) values ($1,$2)',
    [department_name,location_id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/departments/:id',(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    pool.query("update departments set department_name=$1 where department_id=$2",
    [name,id],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.delete('/api/departments/:id',(req,res)=>{
    const {id} = req.params
    pool.query('delete from departments where department_id = $1',
    [id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

//----------Dependents----------
app.get('/api/dependents',(req,res)=>{
    pool.query('select * from dependents',
    [],
    (error,result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/dependents/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from dependents where dependent_id = $1',
    [id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})
app.post('/api/dependents/',(req,res)=>{
    const {first_name} = req.body
    const {last_name} = req.body
    const {relationship} = req.body
    const {employee_id} = req.body
    pool.query('insert into dependents (first_name,last_name,relationship,employee_id) values ($1,$2,$3,$4)',
    [first_name,last_name,relationship,employee_id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/dependents/:id',(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    pool.query("update dependents set first_name=$1 where dependent_id=$2",
    [name,id],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.delete('/api/dependents/:id',(req,res)=>{
    const {id} = req.params
    pool.query('delete from dependents where dependent_id = $1',
    [id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})


//----------Jobs----------
app.get('/api/jobs',(req,res)=>{
    pool.query('select * from jobs',
    [],
    (error,result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/jobs/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from jobs where job_id = $1',
    [id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})
app.post('/api/jobs/',(req,res)=>{
    const {job_title} = req.body
    const {min_salary} = req.body
    const {max_salary} = req.body
    pool.query('insert into jobs (job_title,min_salary,max_salary) values ($1,$2,$3)',
    [job_title,min_salary,max_salary],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/jobs/:id',(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    pool.query("update jobs set job_title=$1 where job_id=$2",
    [name,id],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.delete('/api/jobs/:id',(req,res)=>{
    const {id} = req.params
    pool.query('delete from jobs where job_id = $1',
    [id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})



//-------------------------------Employee-------------------------
app.get('/api/employees',(req,res)=>{
    pool.query('select * from employees',
    [],
    (error,result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/employees/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from employees where employee_id = $1',
    [id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})
app.post('/api/employees/',(req,res)=>{
    const {last_name} = req.body
    const {hire_date} = req.body
    const {job_id} = req.body
    const {salary} = req.body
    const {department_id} = req.body
    pool.query('insert into employees (last_name_hire_date,job_id,salary,department_id) values ($1,$2,$3,$4,$5)',
    [last_name,hire_date,job_id,salary,department_id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/employees/:id',(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    pool.query("update employees set first_name=$1 where employee_id=$2",
    [name,id],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.delete('/api/employees/:id',(req,res)=>{
    const {id} = req.params
    pool.query('delete from employees where employee_id = $1',
    [id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})