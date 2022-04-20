
const db = require('../models/mysql/index');
const { Op } = require("sequelize");
const sequlize = require("sequelize");

const tweets = db.twt;
const Users = db.usr;
const likes = db.likes;

class tweetRepo {
    registerTweet(userid, data) {

        return new Promise(async (resolve, reject) => {
            try {
                let id = userid;
                Users.findByPk(userid)
                    .then(user => {
                        if (!user) {
                            resolve("user doesn't exist")
                        } else {
                            const newPost = {
                                userid: userid,
                                tweet: data.tweet
                            };
                            // user.createtweets(newPost)
                            tweets.create(newPost)
                                .then(function (posts) {
                                    if (posts) {
                                        resolve("created successfully")
                                    }
                                    else {
                                        reject("error in creating tweet")
                                    }
                                });
                        }
                    });
            }
            catch (error) {
                reject(error);
            }
        });
    }

    showTweet(userid) {
        return new Promise(async (resolve, reject) => {
            try {
                tweets.findAll({
                    where: {
                        userid: userid
                    }
                }).then(data => {
                    if(data.length==0){
                        return resolve("user doesnot exist")
                    }
                    resolve(data);
                })
            }
            catch (error) {
                reject(error);
            }

        });

    }
    deleteTweet(userid, twt_id) {
        return new Promise(async (resolve, reject) => {
            try {
                Users.findAll({
                    where: {
                        userid: userid
                    }
                }).then(data => {
                    if (data.length == 0) {
                        resolve("user does not exist")
                    }
                    else {
                        tweets.findAll({
                            where: {
                                tweet_id: twt_id
                            }
                        }).then(t => {
                            if (t.length == 0) {
                                return resolve("post doesnot exist")
                            }
                            else {
                                tweets.destroy({
                                    where: {
                                        userid: userid,
                                        tweet_id: twt_id
                                    }
                                })
                                return resolve("its deleted")
                            }
                        })


                    }
                })
            }
            catch (error) {
                reject(error);
            }

        });

    }
    registerLike(usrid, twtid) {
        return new Promise(async (resolve, reject) => {
            try {
                Users.findAll({
                    where: {
                        userid: usrid
                    }
                }).then((d) => {
                    if (d.length == 0) {
                        return resolve("user does not exist");
                    }
                });
                tweets.findAll({
                    where: {
                        tweet_id: twtid
                    }
                })
                    .then(data => {
                        if (data.length == 0) {
                            resolve('Post does not exist');
                            return
                        }
                        likes.findAll({
                            where: {
                                userid: usrid,
                                tweet_id: twtid
                            }
                        }).then((result) => {
                            if (result.length == 0) {
                                const newLike = {
                                    userid: usrid,
                                    tweet_id: twtid
                                };
                                likes.create(newLike)
                                    .then(function (lks) {
                                        if (lks) {
                                            resolve("liked the post")
                                        }
                                        else {
                                            resolve("Error")
                                        }
                                    });
                            }
                            else {
                                resolve("already like the post")
                            }
                        })

                    })
            }
            catch (error) {
                reject(error);
            }

        });
    }
    showLike(twt_id) {
        return new Promise(async (resolve, reject) => {
            try {

                likes.findAll({
                    where: {
                        tweet_id: twt_id
                    }
                })
                    .then(data => {
                        if (data.length == 0) {
                            return resolve("Post does not exist");
                        }
                        else {
                            likes.findAll({
                                where: {
                                    tweet_id: twt_id
                                },
                                attributes: [
                                    [sequlize.fn('COUNT', sequlize.col('like_id')), 'likes']

                                ]
                                //}
                            }).then(lks => {
                                console.log("in like repo")
                                return resolve(lks);
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        //res.status(500).send(err);
                        resolve('Error in fetching like');
                    })
            }
            catch (error) {
                reject(error);
            }

        });
    }




}


module.exports = tweetRepo;