import { hash as argonHash } from 'argon2';

export const hash = async (string: string) => argonHash(string);
