module.exports = (sequelize,Datatypes) => {
    const Follows = sequelize.define('follows',{
        follow_id: {type: Datatypes.INTEGER,primaryKey:true,autoIncrement: true}    });
    return Follows;
}