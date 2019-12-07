const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = {
    index: async (req, res) => res.send(await User.findAll()),
    find: async ( req, res ) => {
        const user = await User.findOne({where: { id: req.params.id }});
        return res.send(user);
    },
    create: async (req, res, next) => {
        try{
            const { name, email, password } = req.body;
            const user = await User.create({name, email, password});
            return res.send(user);
        }
        catch(err){
            next(err);
        }
    },
    update: async ( req, res, next ) => {
        try{            
            const user = await User.findOne({where: { id: req.params.id }});
            if(!user)
                return res.status(500).send("Usuário não encontrado");
            else{
                const { name, email, password } = req.body;
                const updateQuery = { name, email };
                if(password)
                    updateQuery.password = password;
                await user.update(updateQuery)
                return res.send(user);
            }
        } catch(err){
            next(err);
        }
    },
    delete: async ( req, res ) => {
        await User.destroy({ where: { id: req.params.id } });
        return res.end();
    },
    login: async ( req, res ) => {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if(!user)
            return res.send("Usuário e/ou senha errado");
        else{
            if(user.password === md5(`${password}${process.env.SECRET}`))
                return res.send(jwt.sign({ user: user.id }, process.env.SECRET || "secret", { expiresIn: 60 * 60 }))
            else
                return res.send("Usuário e/ou senha errado");
        }
    }
}