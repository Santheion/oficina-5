const { Album } = require("../models");

module.exports = {
    index: async (req, res) => {
        const albums = await Album.findAll({
            where: {user_id: req.params.id}, 
        });
        res.send(albums);
    },
    create: async (req, res, next) => {
        try{
            const {title} = req.body;
            const user_id = req.params.id;
            const comment = await Album.create({ user_id, title });
            return res.send(comment);
        }
        catch(err){
            next(err);
        }
    },
    update: async ( req, res, next ) => {
        try{            
            const comment = await Album.findOne({where: { id: req.params.a_id }});
            if(!comment)
                return res.status(500).send("Comentário não encontrado");
            else{
                const {title} = req.body;
                const user_id = req.params.id;
                const updateQuery = { user_id, title };
                await comment.update(updateQuery)
                return res.send(comment);
            }
        } catch(err){
            next(err);
        }
    },
    delete: async ( req, res ) => {
        await Album.destroy({ where: { id: req.params.a_id } });
        return res.end();
    }
}