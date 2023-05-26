const router = require("express").Router();
const multer = require("multer");
const movieController = require("../Controllers/movieController");

const upload = multer({ dest: "uploads/" });

//this is base route we will see homepage which has upload fields and table showing movie data
router.get("/", movieController.home);
//post route , which uploads the csv file into the database and redirect to homepage
router.post("/upload", upload.single("csvFile"), movieController.importMovies);

//get route to filter movies as per query(genre/lang) and return JSON data
router.get("/movies", movieController.filterMovies);

module.exports = router;
