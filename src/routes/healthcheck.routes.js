import {Router} from "express"
import { heatlthCheck } from "../controllers/healthcheck.controller.js"

const router = Router()

router.route("/").get(heatlthCheck)

export default router
