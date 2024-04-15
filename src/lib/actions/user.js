import User from "../models/user";
import { connectedToDatabase } from "../mongodb/mongoose";

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try {
    await connectedToDatabase();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          userName: username,
          email: email_addresses[0].email_address,
          profilePhoto: image_url,
        },
      },
      { upsert: true, new: true } // if user does't exits then create user
    );

    await user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    await connectedToDatabase();
    await User.findOneAndDelete({clerkId:id});
  } catch (error) {
    console.log(error);
  }
};
