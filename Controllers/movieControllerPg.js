const csv = require("csv-parser");
const Moviepg = require("../Model/Moviepg");
const pool = require("../configs/postgres");
const fs = require("fs");

module.exports.home = async (req, res) => {
  try {
    const movies = await Moviepg.find();
    res.render("homepg", { movies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
    await Moviepg.deleteMany();
    console.log("deleted");
    await Moviepg.insertMany(movies);

    console.log("File imported/replaced successfully");
    res.redirect("/pg");
  } catch (error) {
    console.error("Error importing movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.filterMovies = async (req, res) => {
  try {
    const genre = req.query.genre;
    const language = req.query.lang;

    let query = "SELECT * FROM movies WHERE true";
    const values = [];

    if (genre && !language) {
      query += " AND genre ILIKE $1";
      values.push(`%${genre}%`);
    }

    if (language && !genre) {
      query += " AND language ILIKE $1";
      values.push(`%${language}%`);
    }

    if (language && genre) {
      query += " AND genre ILIKE $1 AND language ILIKE $2";
      values.push(`%${genre}%`);
      values.push(`%${language}%`);
    }
    const { rows } = await pool.query(query, values);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error retrieving movies:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving movies" });
  }
};
