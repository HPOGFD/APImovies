import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection.js';

interface MovieAttributes {
  id?: number;
  title: string;
  genre: string;
  description: string;
  releaseDate: string;
  streamingStatus: string;
  status: 'seen' | 'watchlist';
}

class Movie extends Model<MovieAttributes> implements MovieAttributes {
  public id!: number;
  public title!: string;
  public genre!: string;
  public description!: string;
  public releaseDate!: string;
  public streamingStatus!: string;
  public status!: 'seen' | 'watchlist';
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    streamingStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('seen', 'watchlist'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Movie',
    tableName: 'movies',
    timestamps: false,
  }
);

export default Movie;