export const findone = async (
  { model, filter = {}, select = "", populate = "" },

) => {
  return await model.findOne(filter).select(select);
};

export const create = async ({ model, data }) => {
  return await model.create(data);
};
