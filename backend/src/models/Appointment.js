import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    appointmentDate: { type: String, required: true },
    appointmentTime: { type: String, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'Completed'],
      default: 'Pending',
    },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

const Appointment = mongoose.model('Appointment', appointmentSchema)

export default Appointment
