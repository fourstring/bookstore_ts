import * as yup from "yup";

export const BookDescriptionSchema = yup.object({
  content: yup.string().trim().required()
});
