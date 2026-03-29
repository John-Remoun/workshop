export const SuccessResponse = ({
  message = "Success",
  status = 200,
  data = undefined,
} = {}) => {
  return res.status(status).json(status, message, data);
};
