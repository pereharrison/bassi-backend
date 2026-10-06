import express from "express"
import { createOverview, getAllOverview, projectStats} from "../controllers/proj-management.js"

const overviewRoute = express.Router()

overviewRoute.post("/create-overview", createOverview)
overviewRoute.get("/get-all-overviews", getAllOverview)
overviewRoute.get("/projectStats", projectStats)


export default  overviewRoute