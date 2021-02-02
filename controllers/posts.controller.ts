const postsServices = require('../services/posts.services.ts');

class PostsController {
    postsService = postsServices;

    add = async(req, res, next) => {
        res
            .send( await( this.postsService.add({
                
                data: req.body,
                file_path: req.file.path
            } ) ) )
    }

    getUsersPosts = async(req, res, next) => {
        res
            .send( await(this.postsService.getUsersPosts(req.query.login)))
    }
}

module.exports = new PostsController;