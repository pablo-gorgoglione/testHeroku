import { model, Schema } from 'mongoose';

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      minlength: 4,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model<IUser>('User', UserSchema);

export default User;
