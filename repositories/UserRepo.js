
const db = require('../models/mysql/index')
const { Op } = require("sequelize");
const bcrypt = require("bcrypt")

const Users = db.usr;
const follows = db.follows;
class userRepo {
    registerUser(data) {

        return new Promise(async (resolve, reject) => {
            try {
                let result;
                Users.findAll({
                    where: {
                        [Op.or]: [{ email: data.email }],
                        [Op.or]: [{ username: data.username }]
                    }
                })
                    .then(async user => {
                        if (user.length) {

                            result = "Email/username already exists, please choose another one";
                            return resolve(result);
                        } else {
                            const salt = await bcrypt.genSalt(5);
                            data.password = await bcrypt.hash(data.password, salt);
                            const newUser = {
                                username: data.username,
                                firstname: data.firstname,
                                lastname: data.lastname,
                                email: data.email,
                                password: data.password
                            };
                            console.log(newUser);
                            Users.create(newUser)
                                .then(function (users) {
                                    if (users) {
                                        resolve(users)
                                    }
                                    else {
                                        result = "Error in inserting new record";
                                    }
                                    resolve(result);
                                });
                        }
                    });
            }
            catch (error) {
                reject(error);
            }
        });
    }

    getUsers() {
        return new Promise(async (resolve, reject) => {
            try {
                Users.findAll().then(data => {
                    resolve(data);
                })
            }
            catch (error) {
                reject(error);
            }

        });

    }
    deleteUser(usrid) {
        return new Promise(async (resolve, reject) => {
            try {
                Users.findAll({
                    where: {
                        userid: usrid
                    }
                }).then(data => {
                    if (data.length == 0) {
                        resolve("user does not exist")
                    }
                    else {
                        Users.destroy({
                            where: {
                                userid: usrid
                            }
                        })
                        resolve("its deleted")

                    }
                })
            }
            catch (error) {
                reject(error);
            }

        });

    }


    updateUser(id, Data) {
        return new Promise(async (resolve, reject) => {


            try {
                const storedUser=await Users.findOne({where:{userid:id}})
                /*Users.findAll({ 
                where: { userid: id } }).
                    then(async storedUser => { */
                        const updateUser = {
                            username: Data.username,
                            firstname: Data.firstname,
                            lastname: Data.lastname,
                            email: Data.email,
                            password: Data.password
                        };
                        if(storedUser==null){
                            return resolve("user does not exist")
                        }
                        if (storedUser.password != updateUser.password) {
                            const salt = await bcrypt.genSalt(5);
                            updateUser.password = await bcrypt.hash(updateUser.password, salt)
                        }
                        

                        Users.findAll({
                            where: {
                               userid:id

                            }
                        }).then(data => {

                            if (data.length == 0) {
                                return resolve("user does not exist")
                            }
                            else {
                                Users.update(updateUser, {
                                    where: {
                                        userid: id
                                    }
                                })
                                updateUser.userid = id;
                                console.log(updateUser);
                                return resolve(updateUser);

                            }
                        })
                





            }
            catch (error) {
                reject(error);
            }

        });

    }

    //following logic
    followUser(data) {
        return new Promise(async (resolve, reject) => {
            if (data.followerid == data.followeeid) {
                return resolve('user cannot follow itself')
            }
            Users.findAll({
                where: {
                    userid: data.followerid
                }
            })
                .then(user => {

                    if (user.length == 0) {
                        resolve("user does not exist")
                        return;
                    } else {
                        Users.findAll({
                            where: {
                                userid: data.followeeid
                            }
                        }).then((u) => {
                            if (u.length == 0) {
                                resolve("followee does not exist")
                                return

                            }
                        })
                        follows.findAll({
                            where: {
                                followerid: data.followerid,
                                followeeid: data.followeeid
                            }
                        }).then((f) => {
                            if (f.length == 0) {
                                const newFollow = {
                                    followerid: data.followerid,
                                    followeeid: data.followeeid
                                };
                                follows.create(newFollow)
                                    .then(function (follows) {
                                        if (follows) {
                                            resolve("following now")
                                        }
                                        else {
                                            resolve("error in following");
                                        }
                                    });
                                return;
                            } else {
                                return resolve("already following")
                            }

                        })

                    }

                });
        });
    }
    getFollowers(data) {
        return new Promise(async (resolve, reject) => {
            Users.findAll({
                where: {
                    userid: data.followeeid
                }
            }).then((d) => {
                if (d.length == 0) {
                    return resolve("user does not exists.")
                }
            })
            follows.findAll({
                where: {
                    followeeid: data.followeeid
                }
            }).then((data) => {
                if (data.length == 0) {
                    return resolve("no one is following")
                }
                else {
                    return resolve(data);
                }
            })
        });
    }

}


module.exports = userRepo;