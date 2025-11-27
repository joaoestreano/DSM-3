import mongoose from "mongoose";
const { Schema } = mongoose;

// Cars
const CarSchema = new Schema({
  model: {
    type: String,
    required: [true, "O modelo é obrigatório"],
    unique: true,
    maxlength: 40,
  },
  year: {
    type: Number,
    required: [true, "O ano é obrigatório"],
  },
});

// People
const PeopleSchema = new Schema({
  name: {
    type: String,
    required: [true, "O nome é obrigatório"],
    unique: true,
    maxlength: 60,
  },
  number: {
    type: String,
    required: [true, "O número é obrigatório"],
    match: [/^[0-9]{11}$/, "O número deve ter exatamente 11 dígitos"],
  },
});

const Car = mongoose.model("Car", CarSchema);
const People = mongoose.model("People", PeopleSchema);

export { Car, People };
