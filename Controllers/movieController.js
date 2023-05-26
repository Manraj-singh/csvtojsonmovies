const csv = require("csv-parser");
const Movie = require("../Model/Movie");
const fs = require("fs");

//Home page logic : gets data from DB and renders ejs file
module.exports.home = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render("index", { movies });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Import movies logic: takes the uploaded file and uoloads the data into DB
module.exports.importMovies = async (req, res) => {
  const movies = [];
  const filePath = req.file.path;

  try {
    const stream = fs.createReadStream(filePath);

    for await (const row of stream.pipe(csv())) {
      const movie = {
        imdb_title_id: row.imdb_title_id || "",
        original_title: row.original_title || "",
        year: row.year ? parseInt(row.year) : "",
        date_published: row.date_published ? new Date(row.date_published) : "",
        genre: row.genre || "",
        duration: row.duration ? parseInt(row.duration) : "",
        language: row.language || "",
        description: row.description || "",
        reviews_from_users: row.reviews_from_users
          ? parseFloat(row.reviews_from_users)
          : "",
        reviews_from_critics: row.reviews_from_critics
          ? parseFloat(row.reviews_from_critics)
          : "",
      };

      movies.push(movie);
    }
    await Movie.deleteMany({}); // Remove existing documents from the collection
    await Movie.insertMany(movies); //add new documents into collection
    console.log("file imported/replaced successfully ");
    res.redirect("/");
  } catch (error) {
    console.error("Error importing movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Filtering logic: when given input query we filter data from DB as per query(not case sensitive)
module.exports.filterMovies = async (req, res) => {
  try {
    const genre = req.query.genre;
    const language = req.query.lang;

    const query = {};
    if (genre) {
      const genreRegex = new RegExp(genre, "i");
      query.genre = { $regex: genreRegex };
    }

    if (language) {
      query.language = { $regex: new RegExp(language, "i") };
    }
    const movies = await Movie.find(query);
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error retrieving movies:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving movies" });
  }
};
