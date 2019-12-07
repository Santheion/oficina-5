const { Comment } = require("../models");

module.exports = {
    index: async (req, res) => {
        const comments = await Comment.findAll({
            where: {post_id: req.params.id}, 
        });
        res.send(comments);
    },
    create: async (req, res, next) => {
        try{
            const { name, email, body } = req.body;
            const post_id = req.params.id;
            const comment = await Comment.create({ post_id, name, email, body });
            return res.send(comment);
        }
        catch(err){
            next(err);
        }
    },
    update: async ( req, res, next ) => {
        try{            
            const comment = await Comment.findOne({where: { id: req.params.c_id }});
            if(!comment)
                return res.status(500).send("Comentário não encontrado");
            else{
                const { name, email, body } = req.body;
                const post_id = req.params.id;
                const updateQuery = { post_id, name, email, body };
                await comment.update(updateQuery)
                return res.send(comment);
            }
        } catch(err){
            next(err);
        }
    },
    delete: async ( req, res ) => {
        await Comment.destroy({ where: { id: req.params.c_id } });
        return res.end();
    }
}