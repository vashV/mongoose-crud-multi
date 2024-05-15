import log from "@ajar/marker";
import user_model from "./user.model.mjs";

export const create_user = async (payload) => {
  const user = await user_model.create(payload);
  return user;
};
export const get_all_users = async () => {
  const users = await user_model.find();
  // .select(`first_name
  //         last_name
  //         email
  //         phone`);
  return users;
};
export const get_user_by_id = async (user_id) => {
  const user = await user_model.findById(user_id);
  // .select(`-_id
  //     first_name
  //     last_name
  //     email
  //     phone`);
  return user;
};
export const update_user_by_id = async (user_id, payload) => {
  const user = await user_model.findByIdAndUpdate(user_id, payload, {
    new: true,
    upsert: true,
  });
  return user;
};
export const delete_user_by_id = async (user_id) => {
    const user = await user_model.findByIdAndRemove(user_id);
    return user;
};
