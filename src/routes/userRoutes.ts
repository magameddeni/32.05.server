import { Request, Response, Router } from "express"
import { body, validationResult } from "express-validator"

const userList = [
  {
    email: "jim@gmail.com",
    number: 221122,
  },
  {
    email: "jam@gmail.com",
    number: 830347,
  },
  {
    email: "john@gmail.com",
    number: 221122,
  },
  {
    email: "jams@gmail.com",
    number: 349425,
  },
  {
    email: "jams@gmail.com",
    number: 141424,
  },
  {
    email: "jill@gmail.com",
    number: 822287,
  },
  {
    email: "jill@gmail.com",
    number: 822286,
  },
]

const router = Router()

let currentRequest: null | Request = null

router.post(
  "/process",
  [body("number").notEmpty(), body("email").isEmail()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    const users = new Set(userList)
    let { number } = req.body
    const { email } = req.body

    number = number.replace("_", "")
    number = parseInt(number)

    console.log(number)

    if (currentRequest) currentRequest.destroy()
    currentRequest = req

    await new Promise((resolve) => setTimeout(resolve, 5000))

    res.status(200).json({ result: "Запрос обработан" })
    currentRequest = null
    return
  },
)

export default router
