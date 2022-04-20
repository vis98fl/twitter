module.exports = (sequelize,Datatypes) => {
    const tweets = sequelize.define('tweets',{
        tweet_id: {type: Datatypes.INTEGER,primaryKey:true,autoIncrement: true},
        tweet: {type:Datatypes.STRING}
    });
    return tweets;
}