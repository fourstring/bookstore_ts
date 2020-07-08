import * as yup from 'yup'

export const BookBasicSchema = yup.object({
  title: yup.string().trim().required(),
  author: yup.string().trim().required(),
  isbn: yup.string().min(10).max(13).trim().required(),
  price: yup.number().min(0),
  stock: yup.number().min(0)
});
