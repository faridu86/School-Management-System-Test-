module.exports = function(sequelize, DataTypes) {

    var tableName = "email_notifications_queue";

    var attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        v_to: DataTypes.STRING,
        v_from: DataTypes.STRING,
        v_from_name: {type: DataTypes.STRING, allowNull: true},
        v_cc: {type: DataTypes.STRING, allowNull: true},
        v_bcc: {type: DataTypes.STRING, allowNull: true},
        v_attach: {type: DataTypes.STRING, allowNull: true},
        v_subject: DataTypes.STRING,
        t_body: DataTypes.STRING,
        i_send_after_time: {type: DataTypes.INTEGER, allowNull: true},
        i_created: DataTypes.INTEGER,
        i_sent_time: {type: DataTypes.INTEGER, allowNull: true}
    };

    var instanceMethods = {};

    var classMethods = {};

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};