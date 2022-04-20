const Sequelize = require('sequelize');
const sequelize=require('../../db/mysql_db')
const  userModel=require('./Users');
const  tweetModel=require('./tweet');
const  likeModel=require('./likes');
const  followModel=require('./follows')
const Datatypes = require('sequelize/lib/data-types');

const db={}
db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.usr=userModel(sequelize,Datatypes);
db.twt=tweetModel(sequelize,Datatypes);
db.likes=likeModel(sequelize,Datatypes);
db.follows=followModel(sequelize,Datatypes);

db.usr.hasMany(db.twt,{foreignKey:'userid'})

db.likes.belongsTo(db.usr,{foreignKey:'userid'});
db.likes.belongsTo(db.twt,{foreignKey:'tweet_id'});

db.follows.belongsTo(db.usr,{foreignKey:'followerid'});
db.follows.belongsTo(db.usr,{foreignKey:'followeeid'});

db.sequelize.sync({force:true}).then((result)=> {
    console.log("connected");
}).catch((err)=>{
    console.log(err);
})

module.exports=db;