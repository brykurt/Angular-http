import { Component, OnInit } from "@angular/core";

import { Reader } from "../models/reader";
import { DataService } from "../core/data.service";
@Component({
  selector: "app-add-reader",
  templateUrl: "./add-reader.component.html",
  styles: [],
})
export class AddReaderComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {}

  //This function returns void 
  saveReader(formValues: any): void {
    let newReader: Reader = <Reader>formValues;
    newReader.readerID = 0;
//Subscribed the addReader function and it has 2 callbacks  one is to log the data if  added, and the 2nd one, is to log an error.
    this.dataService.addReader(newReader).subscribe(
      (data: Reader) => console.log(data),
      (err: any) => console.log(err)
    );
  }
}
