const router = require("express").Router();
const multer = require("multer");
const movieControllerpg = require("../Controllers/movieControllerPg");

const upload = multer({ dest: "uploads/" });

// This is the base route that renders the homepage
router.get("/", movieControllerpg.home);

// Post route to upload the CSV file and insert data into PostgreSQL
router.post(
  "/upload",
  upload.single("csvFile"),
  movieControllerpg.importMovies
);

// Get route to filter movies by genre and language
router.get("/movies", movieControllerpg.filterMovies);

module.exports = router;
