const postModels = require('../database/database.ts')

const post = new postModels.Posts;

class PostsServices{
    add = async(postData) => {
        let postsFromDB = await postModels.Posts.find(function (err) {
            if (err) return console.error(err);
        })

        let samePost = postsFromDB.find ( (post) =>  post._id === postData.id)

        if(samePost){
            return JSON.stringify('Post already exist');
        }
        else{
            post._id.id = postData.data.id;
            post.author = postData.data.author;
            post.date = postData.data.date;
            post.path = postData.file_path;
            post.save();
            return JSON.stringify('Success')
        }
    }

    edit = (postData) => {

    }

    getUsersPosts = async(user) => {
        
        let postsFromDB = await postModels.Posts.find(function (err) {
            if (err) return console.error(err);
        })
        
        let answer = postsFromDB.filter( ( post ) => post.author === user);
        return JSON.stringify(answer);
    }

    delete = () => {

    }
}

module.exports = new PostsServices