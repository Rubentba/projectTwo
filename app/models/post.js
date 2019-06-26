module.exports = function(sequelize, Datatypes){
    var post = sequelize.define("post", {
        title: Datatypes.STRING,
        body: Datatypes.STRING
    },{});

    post.associate = function(models){
        post.belongsTo(models.user,{as:"user", foreginKey: userId})
    }
    return post;
}