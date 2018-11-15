import sequelize, { DataTypes } from '../database'
import crypto from 'crypto'
import JWT from 'jsonwebtoken';

const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      password: { type: DataTypes.STRING }, // TODO: Encrypt
      email: { type: DataTypes.STRING },
      jwtSecret: DataTypes.STRING, // TODO: Encrypt
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      service: { type: DataTypes.STRING, allowNull: true }
    },
    {
      paranoid: true,
      freezeTableName: true,
      indexes: [
        {
          fields: ['email'],
        },
      ],
    }
  );
  

const setRandomJwtSecret = (model: any) => {
  model.jwtSecret = crypto.randomBytes(64).toString('hex');
};

User.prototype.getJwtToken = function() {
  return JWT.sign({ id: this.id }, this.jwtSecret)
}
User.beforeCreate(setRandomJwtSecret)
export default User
