
const User = require('../models/Users');
const Repo = require('../models/Repos')
const jwt = require('jsonwebtoken');
require('dotenv').config();

// secret key is pulled from .env file
const ACCESS = process.env.ACCESS_TOKEN_SECRET;


// route functions 
// creates a new user in MongoDB and sends data back to client
exports.register = async (req, res) =>{
    try{
        const users = await User.find()
        let numUsers = 0;
        if (users.length>0){
            numUsers = users[users.length-1]._id;
        }else{
            numUsers = 0;
        }
           const data = {
            _id: numUsers +1,
            name : req.body.name,
            password : req.body.password,
            email : req.body.email,
            role: req.body.role,
            ou: req.body.ou,
            division: req.body.division
           }
        //check user exists be for saving to db
        const checkUser = await User.exists({email:data.email})   
        if(checkUser === null){
            const newUser = new User(data);
            newUser.save();
            res.send({data: "User created"})
        }else{
            res.send({data: "User already exists"})
        }
        
    }
    catch {
       res.send({data:"error"})
    }
}
// refresh route verifies the jwt cookie stored in client and keep user login if page is refreshed
exports.refresh = async (req, res) =>{
    try {
        const cookie = req.headers['cookie'].split('=')[1];
        const decoded =  jwt.verify(cookie, ACCESS)
        
        if (decoded != undefined){

            res.send({data:"success", token: cookie})
        }else{
            
            res.send({users: "Not authorised"})
        }

    } catch (error) {
        
    }
}
// logout clear jwt cookie and redirects
exports.logout = (req, res) =>{
    res.clearCookie('jwt');
    return res.status(200).redirect('/');
}
// login logs a user in by checking credentials on DB with input
exports.login = async (req, res) => {

    try {
        const data = req.body;
        const checkUser = await User.findOne({email:data.email})
        
        
        if (checkUser === null){
            res.send({data:"User doesn't exist"})
        }else if (data.password === checkUser.password){
            // payload data is used to generate jwt token
            payload = {
                "_id": checkUser._id,
                "name": checkUser.name,
                "email": checkUser.email,
                "role": checkUser.role,
                "ou": checkUser.ou,
                "division": checkUser.division
            }
            
            const token = jwt.sign(JSON.stringify(payload), ACCESS, {algorithm: 'HS256'})
            
            res.cookie('jwt', token, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000});
            res.send({data:"success", token: token});
            
        }else{
            res.send({data:"incorrect password"})
        }
        
    } catch (e){
        return e.message
    }
}
// update a repos specfic field based data received from client and sends data back to client
exports.update = async (req, res) =>{
    try{ 
        const updateOne = await Repo.updateOne({_id:req.body._id}, req.body.update);

        res.send({data: "Repo updated"});
    }
    catch {
        res.status(404).send({ error: "Repo not found!" });
    }
}
// updates user on DB if admin is login
exports.updateuser = async (req, res) =>{
    try{
        const updateOne = await User.updateOne({_id:req.body._id}, req.body.update);
        res.send({data: "User updated"});
    }
    catch {
        res.status(404).send({ error: "User not found!" });
    }
}
// gets repos based on recieved auth token send from client
exports.getRepo = async (req, res) =>{
    
        const token = req.headers['authorization'].split(' ')[1]
        
        try {
            const decoded =  jwt.verify(token, ACCESS)
            if (decoded.role.a){
                const repos = await Repo.find()
                res.send({repo: repos, role:decoded.role, ou: decoded.ou, division: decoded.division, url: '/useradmin'})
            }else{
                const repos = await Repo.find({ou:decoded.ou, division: decoded.division});
                res.send({repo: repos, role:decoded.role, ou: decoded.ou, division: decoded.division, url: '/user'})
            }
            
            //console.log(repos)
            //res.send({repo: repos, role:decoded.role, ou: decoded.ou, division: decoded.division})
        } catch (error) {
            
        }
        //const jobs = await Job.find({archive: false}).sort({submissionDate: 'desc', status:'desc'});
        
    
    
}
// get user details from DB, auth token is checked before data is sent to the client
exports.getUsers = async (req, res) =>{
    
    const token = req.headers['authorization'].split(' ')[1]
    
    try {
        const decoded =  jwt.verify(token, ACCESS)
        
        if (decoded.role.a){

            const users = await User.find()
            
            res.send({users: users})
        }else{
            
            res.send({users: "Not authorised"})
        }
        
    } catch (error) {
        
    }
    
    


}
// creats a new repo in DB, all users can create
exports.createRepo = async (req, res) =>{
    // gets the length of Repo document for index
    const repos = await Repo.find()
        let numRepos = 0;
        if (repos.length>0){
            numRepos = repos[repos.length-1]._id;
        }else{
            numRepos = 0;
        }
    // data from client is json object to save to DB
    const data = {
        _id: numRepos +1,    
        name : req.body.name,
        url : req.body.url,
        username : req.body.username,
        password: req.body.password,
        ou: req.body.ou,
        division: req.body.division
       }

    try {

        const newRepo = new Repo(data);
            newRepo.save();
            res.send({data: "Repo created"})
    } catch {
        res.send({data:"error"})
    }
}


