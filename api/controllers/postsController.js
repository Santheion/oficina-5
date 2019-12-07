const { Post, User } = require("../models");

module.exports = {
    index: async (req, res) => {
        return res.send(await Post.findAll({
            include: [{model: User, as: "author"}]
        }))
    },
    find: async ( req, res ) => {
        const post = await Post.findOne({where: { id: req.params.id }});
        return res.send(post);
    },
    create: async (req,res, next) => {
        try{
            const { user_id, title, body } = req.body;
            const post = await Post.create({ user_id, title, body });
            return res.send(post);
        }
        catch(err){
            next(err);
        }
    },
    update: async ( req, res, next ) => {
        try{
            const post = await Post.findOne({where: { id: req.params.id }});
            if(!post)
                return res.status(500).send("Post não encontrado");
            else{
                const { user_id, title, body } = req.body;
                const updateQuery = { user_id, title, body };
                await post.update(updateQuery)
                return res.send(post);
            }
        }
        catch(err){
            next(err)
        }
    },
    delete: async ( req, res ) => {
        await Post.destroy({ where: { id: req.params.id } });
        return res.end();
    }
}