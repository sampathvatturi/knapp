import { Injectable } from '@angular/core';
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class Md5hashService {

  constructor() { }

  logMd5(blob:string) {
    const hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(blob));
    return hash.toString(CryptoJS.enc.Hex);
  }

}
