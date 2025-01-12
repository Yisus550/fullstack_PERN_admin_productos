import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

//* The Table decorator is used to define the table name in the database.
@Table({
  tableName: "products",
})

//* The Model class is used to define the columns in the table.
class Products extends Model {
  //* The Column decorator is used to define the column name, data type, and constraints.
  @Column({
    type: DataType.STRING(100), //* The data type is a string with a maximum length of 100 characters.
  })
  declare name: string;

  @Column({
    type: DataType.FLOAT(),
  })
  declare price: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN(),
  })
  declare availability: boolean;
}

export default Products;
