import "server-only";
import { getConnection } from "@/server/db/database";

export async function insertNewPoem(text: string) {
  const conn = await getConnection();
  const normalized_text = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
  let results: any[] = [];

  try {
    const [rows] = await conn.execute("SELECT * FROM poem_entries");
    results = rows as any[];
  } catch (error) {
    console.error("Error fetching poems:", error);
    throw new Error("Failed to fetch poems from the database.");
  }

  results.forEach((poem: any) => {
    if (poem.normalized_text === normalized_text) {
      throw new Error("Poem already exists in the database.");
    }
  });
  try {
    const [insertResult] = await conn.execute(
      "INSERT INTO poem_entries (text, normalized_text) VALUES (?, ?)",
      [text, normalized_text]
    );
    return insertResult;
  } catch (error) {
    console.error("Error inserting poem:", error);
    throw new Error("Failed to insert poem into the database.");
  }
}

export async function getPoems() {}
