const pool = require("../configs/postgres");

// Define the Movie model
class Moviepg {
  static async find() {
    const query = "SELECT * FROM movies";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async insertMany(movies) {
    const query =
      "INSERT INTO movies (imdb_title_id, original_title, year, date_published, genre, duration, language, description, reviews_from_users, reviews_from_critics) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";

    // const values = movies.map((movie) => [
    //   movie.imdb_title_id,
    //   movie.original_title,
    //   movie.year,
    //   movie.date_published,
    //   movie.genre,
    //   movie.duration,
    //   movie.language,
    //   movie.description,
    //   movie.reviews_from_users,
    //   movie.reviews_from_critics,
    // ]);

    for (const movie of movies) {
      const val = [
        movie.imdb_title_id,
        movie.original_title,
        movie.year,
        movie.date_published,
        movie.genre,
        movie.duration,
        movie.language,
        movie.description,
        movie.reviews_from_users,
        movie.reviews_from_critics,
      ];

      await pool.query(query, val);
    }
  }

  static async deleteMany() {
    const query = "DELETE FROM movies";
    await pool.query(query);
  }
}

module.exports = Moviepg;
