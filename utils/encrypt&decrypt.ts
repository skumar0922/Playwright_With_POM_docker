import CryptoJS from 'crypto-js';

export default class Credentials {
  private encryptionKey: string;
  private encryptedEmail: string;
  private encryptedPassword: string;

  constructor() {
    this.encryptionKey = process.env.ENCRYPTION_KEY || "default-key";

    // Encrypt email and password during initialization
    const email = process.env.EMAIL || "";
    const password = process.env.PASSWORD || "";
    this.encryptedEmail = this.encrypt(email);
    this.encryptedPassword = this.encrypt(password);
  }

  // Encrypt login details
  encrypt(text: string): string {
    if (!this.encryptionKey) {
      throw new Error("Encryption key is not defined!");
    }
    const encrypted = CryptoJS.AES.encrypt(text, this.encryptionKey).toString();
    return encrypted;
  }

  // Decrypt login details
   decrypt(cipherText: string): string {
    if (!this.encryptionKey) {
      throw new Error("Encryption key is not defined!");
    }
    const bytes = CryptoJS.AES.decrypt(cipherText, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // Get decrypted email and password
  public getDecryptedEmail(): string {
    return this.decrypt(this.encryptedEmail);
  }

  public getDecryptedPassword(): string {
    return this.decrypt(this.encryptedPassword);
  }
}