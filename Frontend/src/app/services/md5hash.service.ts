import { Injectable } from '@angular/core';
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class Md5hashService {

  secretKey: string = 'knappams';
  constructor() { }

  logMd5(blob: string) {
    const hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(blob));
    return hash.toString(CryptoJS.enc.Hex);
  }

  passwordEncrypt(value: any) {
    let _key = CryptoJS.enc.Utf8.parse(this.secretKey);
    let _iv = CryptoJS.enc.Utf8.parse(this.secretKey);
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  passwordDecrypt(value: any) {
    let _key = CryptoJS.enc.Utf8.parse(this.secretKey);
    let _iv = CryptoJS.enc.Utf8.parse(this.secretKey);
    let decrypted = CryptoJS?.AES?.decrypt(value, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

}
