import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  virtual: { type: Boolean, required: true },
  location: { type: String, required: isNotVirtual },
  date: { type: Date, required: true },
  time: { type: Number, required: true },
  active: { type: Boolean, default: false },
  free: { type: Boolean, required: true },
  price:{type:Number, default:0, required:isFree},
  description: String,
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
  },
})

function isNotVirtual() {
  return this.virtual === true ? false : true
}
function isFree() {
  return this.free === true?false:true
}
export const Event = mongoose.model('event', eventSchema)
