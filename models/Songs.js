
module.exports = (sequelize, DataTypes) => {

    const Songs = sequelize.define("Songs", {
        sid : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, 
            primaryKey: true,
        },
        audio : {
            type: DataTypes.STRING,
            allowNull: false
        },
        image : {
            type: DataTypes.STRING,
            allowNull: false
        },
        album : {
            type: DataTypes.STRING,
            allowNull: true
        },
        track : {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist : {
            type: DataTypes.STRING,
            allowNull: false
        },
        privacy : {
            type: DataTypes.STRING, 
            defaultValue: "public"
        },
        playCount : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        tableName: "Songs",
        timestamps: true,
        paranoid: true
    }
    )

    return Songs;
}