module.exports = (sequelize,Datatypes) => {
    const Likes = sequelize.define('likes',{
        like_id: {type: Datatypes.INTEGER,primaryKey:true,autoIncrement: true},
    });
    return Likes;
}