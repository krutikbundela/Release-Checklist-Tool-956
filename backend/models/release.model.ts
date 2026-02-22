import { pool } from "../config/db";
import { computeStatus } from "../utils/compute-status.ts";

export const ReleaseModel = {
  async create(name: string, release_date: string, additional_info?: string) {
    const steps = [false, false, false, false, false, false, false];
    const status = "planned";

    const result = await pool.query(
      `INSERT INTO releases 
       (name, release_date, status, steps, additional_info)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, release_date, status, steps, additional_info],
    );

    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query(
      `SELECT * FROM releases ORDER BY created_at DESC`,
    );

    return result.rows;
  },

  async update(
    id: string,
    name: string,
    release_date: string,
    steps: boolean[],
    additional_info: string,
  ) {
    const status = computeStatus(steps);

    const result = await pool.query(
      `UPDATE releases
       SET name=$1, release_date=$2, steps=$3, status=$4, additional_info=$5
       WHERE id=$6
       RETURNING *`,
      [name, release_date, steps, status, additional_info, id],
    );

    return result.rows[0];
  },

  async delete(id: string) {
    await pool.query(`DELETE FROM releases WHERE id=$1`, [id]);
  },
};
