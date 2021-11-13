import { date } from 'joi';
import { Schema, model, SchemaTypes } from 'mongoose';

const EventDateTime = new Schema({
  eventDate: { type: Date, required: true },
  eventStartTime: { type: Number, required: true },
  eventEndTime: { type: Number, required: true },
});

const eventSchema = new Schema(
  {
    name: { type: String, required: true },
    virtual: { type: Boolean, required: true },
    location: { type: String, required: isNotVirtual },
    eventDateTime: {
      type: [EventDateTime], required: true,
    },
    price: { type: Number, default: 0 },
    description: String,
    createdBy: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true },
);

function isNotVirtual() {
  return this.virtual !== true;
}
function isFree() {
  return this.free !== true;
}
export const Event = model('event', eventSchema);
