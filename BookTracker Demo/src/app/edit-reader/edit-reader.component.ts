import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Reader } from "../models/reader";
import { DataService } from '../core/data.service';
import { BadgeService } from '../services/badge.service';

@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styles: [],
  providers: [BadgeService]
})
export class EditReaderComponent implements OnInit {

  selectedReader: Reader;
  currentBadge: string;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private badgeService: BadgeService) { }

  ngOnInit() {
    let readerID: number = parseInt(this.route.snapshot.params['id']);
    // this.selectedReader = this.dataService.getReaderById(readerID);
    this.dataService.getReaderById(readerID).subscribe(
      (data:Reader) => this.selectedReader = data
    );
    this.currentBadge = this.badgeService.getReaderBadge(this.selectedReader.totalMinutesRead);
  }

  //this function returns void and it subscribed to the observable to update the information of the reader
  // It also used 2 callbacks 
  saveChanges(): void {
    this.dataService.updateReader(this.selectedReader)
      .subscribe(
        (data: void) => console.log(`${this.selectedReader.name} updated successfully.`),
        (err: any) => console.log(err)
      );
  }
    
    
}

