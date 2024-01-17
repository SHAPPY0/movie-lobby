import {Document, Model, model, Schema } from "mongoose";

interface IMovie {
    title:          string;
    thumbnail:      string;
    genre:          string;
    streamLink:     string;
    rating:         number;
    releaseDate:    Date;
    updatedAt?:     Date;
}

export default interface IMoviesModel extends IMovie, Document {
    toJSON(): any;
}

enum GenreTypes {
    Action = "action",
    Thriller = "thriller",
    Horror = "horror",
    Drama = "drama",
    Comedy = "comedy",
    ScienceFiction = "science fiction",
    Romance = "romance",
    Animation = "animation",
    Documentary = "documentary",
    Adventure = "adventure",
    Crime = "crime",
}

const MovieSchema = new Schema({
    title: {
        type: Schema.Types.String,
        lowerCase: true,
        required: [true, "is required"],
        index:    true
    },
    thumbnail: {
        type: Schema.Types.String,
    },
    genre: [{
        type: Schema.Types.String,
        enum: Object.values(GenreTypes)
    }],
    streamLink: {
        type: Schema.Types.String
    },
    rating: {
        type: Schema.Types.Number
    },
    releaseDate: {
        type: Schema.Types.Date
    },
    createdAt: {
        type: Schema.Types.Date,
        default: new Date()
    },
    updatedAt: {
        type: Schema.Types.Date,
        default: new Date()
    },
    isActive: {
        type: Schema.Types.Boolean,
        defaul: true
    }
})


export const Movies: Model<IMoviesModel> = model<IMoviesModel>('movies', MovieSchema);