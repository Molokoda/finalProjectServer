// import { models } from "mongoose";

const postModels = require('../database/database.ts')
const fs = require('fs');
const post = new postModels.Posts;
const pathFinder = require('path');
class PostsServices{
    add = async(postData) => {
        post._id.id = postData.data.id;
        post.author = postData.data.author;
        post.date = postData.data.date;
        post.path = postData.file_path;
        post.likes = postData.data.likes;
        post.comments = postData.data.comments
        post.isNew = true; 
        await post.save();
        return 'Success'
    }

    getUsersPosts = async(user) => {
        
        let postsFromDB = await postModels.Posts.find(function (err) {
            if (err) return console.error(err);
        })
        
        let answer = postsFromDB.filter( ( post ) => post.author === user);
        return JSON.stringify(answer);
    }


    getFriendsPosts = async(friends) => {
        let postsFromDB = await postModels.Posts.find( function(err){
            if(err) return console.error(err);
        });

        let answer = postsFromDB.filter( (post) => {
            let isFriendPost = friends.find( (friend) => friend === post.author);
            if( isFriendPost ){
                return true
            }
            else{
                return false
            }
        })

        return JSON.stringify(answer)
        
    }

    deletePost = async(post) => {
        let pathToImg = pathFinder.resolve('public/images');
        let temp = post.path.split('/');
        await fs.unlink(`${pathToImg}\\${temp[temp.length - 1]}`,
            (err) => {
                if (err) throw err;
            });
        await postModels.Posts.findOneAndDelete( {_id: post.id } ).exec();
        return JSON.stringify('success');
    }

    dislike = async(post) => {
        await postModels.Posts.findOneAndUpdate( {_id: post.id}, {likes: post.likes} ).exec();
        return 'success'
    }

    addComment = async( data ) => {
        let post = await postModels.Posts.findOne( {_id: data.id} ).exec();
        post.comments.push(data.comment);
        await postModels.Posts.findOneAndUpdate( { _id: data.id }, { comments: post.comments } ).exec();
        return 'success'
    }
}

module.exports = new PostsServices