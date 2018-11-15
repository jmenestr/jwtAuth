import Sequelize from 'sequelize';
import debug from 'debug';

const database = new Sequelize('postgresql://localhost/jmenestr', {
  logging: debug('sql'),
  typeValidation: true,
  operatorsAliases: false,
});
database.sync({force: true})

export const DataTypes = Sequelize
export default database
