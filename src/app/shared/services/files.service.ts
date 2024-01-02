import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private sanitizer: DomSanitizer) { }

  extraerBase64 = async ($event: any) => new Promise((resolve, rejects) => {
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error =>{
        resolve({
          base: null 
        })
      };
      return true;

    }catch(e){
      return null;
    }
  });
}
