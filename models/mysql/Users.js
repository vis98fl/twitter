

module.exports = (sequelize, Datatypes) => {
    const Users = sequelize.define('users', {
        userid: { type: Datatypes.INTEGER, primaryKey: true,autoIncrement:true },
        username: { type: Datatypes.STRING, allowNull: false ,unique:true},
        firstname: { type: Datatypes.STRING, allowNull: false },
        lastname: { type: Datatypes.STRING, allowNull: true },
        email: { type: Datatypes.STRING, allowNull: false },
        password: { type: Datatypes.STRING, allowNull: false },
    });

    return Users;

}