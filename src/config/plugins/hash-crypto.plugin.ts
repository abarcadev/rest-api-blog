import { createHash } from "crypto";

export const hash256Adapter = (text: string): string => createHash('sha256').update(text).digest('hex');