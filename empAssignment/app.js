const express = require('express');

const app = express();

const PORT = 4000;

app.use(express.json());

let emp = [
    {id: 1, name: 'Vratik', age: 24, bs: 3043943403}
];

app.get('/', (req,res)=>{
    res.send("Welcome to Employee details page.");
})

app.post('/emp',(req,res) => {
    const {name, age, bs} = req.body;
    console.log(name);
    console.log(age);
    console.log(bs);

    if(!name || !age || !bs){
        return res.status(400).json({message: 'Name, Age & Bs are required'});
    }

    const newId = emp.length > 0 ? Math.max(...emp.map(emp => emp.id)) + 1 : 1;
    console.log(newId);
    const newEmp = {
        id: newId,
        name,
        age,
        bs
    }

    emp.push(newEmp);

    res.status(201).json({message: 'Employee created successfully', newEmp});
})


app.get('/emp', (req,res) => {
    res.json(emp);
})

app.get('/emp/:id', (req,res) => {
    const empId = parseInt(req.params.id);

    if(isNaN(empId)){
        return res.status(400).json({message: 'Invalid emp Id'});
    }

    const Emp = emp.find(e => e.id === empId);

    if(!Emp){
        return res.status(404).json({message: 'Employee not found'});
    }

    res.json(Emp);
})


app.put('/emp/:id', (req,res) => {
    const empId = parseInt(req.params.id);

    if(isNaN(empId)){
        return res.status(400).json({message: 'Invalid emp Id'});
    }

    const empIdx = emp.findIndex(e => e.id === empId);

    if(empIdx === -1){
        return res.status(404).json({message: 'Employee not found'});
    }


    emp[empIdx] = {
        ...emp[empIdx],
        name: req.body.name || emp[empIdx].name,
        age: req.body.age || emp[empIdx].age,
        bs: req.body.bs || emp[empIdx].bs
    };

    res.json({message: 'User updated successfully', emp: emp[empIdx]});
});


app.delete('/emp/:id', (req, res) => {
    const empId = parseInt(req.params.id);

    if(isNaN(empId)){
        return res.status(400).json({message: 'Invalid empId'});
    }

    const empIdx = emp.findIndex(e => e.id === empId);

    if(empIdx === -1){
        return res.status(404).json({
            message: 'Employee not found'
        });
    }

    emp.splice(empIdx, 1);

    res.json({message: 'Employee deleted successfully'});
})

app.listen(PORT, (err) =>{
    if(!err){
        console.log(`Server is listening on port http://localhost:${PORT}`);
    }
    else{
        console.log(`Error running server`);
    }
})