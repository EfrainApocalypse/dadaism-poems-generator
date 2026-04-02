"use server";

import { insertNewPoem } from "@/modules/poems.service";

export async function insertPoemAction(text: string) {
  try {
    await insertNewPoem(text);
    return { ok: true as const, error: null };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to insert poem.";

    return { ok: false as const, error: message };
  }
}
