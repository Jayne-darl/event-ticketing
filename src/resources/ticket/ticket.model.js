import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'event',
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true },
);

export const Ticket = mongoose.model('ticket', ticketSchema);
