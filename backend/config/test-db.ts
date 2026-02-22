import { pool } from "./db";

async function testDB() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("DB Connected ✅");
    console.log(result.rows);
  } catch (err) {
    console.error("DB Error ❌", err);
  }
}

testDB();
