import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  uploadedFiles: any[] = [];
  bannerDoc: string = "";
  errorArray: Array<any> = [];

  onSelect(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsDataURL(file);
    }
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    let imageSrc = reader.result;
    
    this.addImageProcess(imageSrc).then(img => {
      let height = img['height'];
      let width = img['width'];
      let proporcion = width/height;

      // Proporción estándar: 4 Margen: +-10%
      if(proporcion < 3.6 || proporcion > 4.4) {
        this.bannerDoc = "";
        this.errorArray.push({severity:'info', summary:'Las dimensiones de la imagen no son válidas. Sólo están permitidas las que tengan una relación de aspecto cercana a 4:1', detail:'PrimeNG rocks'});
      } else {
        this.bannerDoc = imageSrc;
        this.errorArray = [];
      }
    })    
  }

  addImageProcess(src){
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }
}
