import pool from "../db.js"

export const authModel = {
  getUserByEmail: async (email) => {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email])
    return result.rows[0]
  },

  addUser: async ({ email, password }) => {
    const result = await pool.query(
      "INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING *",
      [email, password]
    )
    return result.rows[0]
  }
}
