import "server-only";
import { storeUpload, type StoredFile } from "@/lib/store";
import { MAX_ARTWORK_BYTES } from "@/lib/artwork-constants";

export { MAX_ARTWORK_BYTES, ACCEPTED_ARTWORK, ACCEPTED_ARTWORK_LABEL } from "@/lib/artwork-constants";

/**
 * Stores an uploaded artwork file privately (outside /public) and returns its
 * metadata. Nothing about an upload is ever exposed at a public URL.
 */
export async function saveArtworkFile(file: File): Promise<StoredFile> {
  if (file.size > MAX_ARTWORK_BYTES) {
    throw new Error(
      `That file is larger than ${Math.round(MAX_ARTWORK_BYTES / (1024 * 1024))} MB.`,
    );
  }
  return storeUpload(file);
}
