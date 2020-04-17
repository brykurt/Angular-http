import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Book } from "../models/book";
import { Reader } from "../models/reader";
import { DataService } from '../core/data.service';
import { BookTrackerError } from '../models/bookTrackerError';


@Component({
selector: 'app-dashboard',
templateUrl: './dashboard.component.html',
styles: []
})
export class DashboardComponent implements OnInit {

allBooks: Book[];
allReaders: Reader[];
mostPopularBook: Book;

constructor(private dataService: DataService,
private title: Title,
private route: ActivatedRoute) { }

ngOnInit() {

let resolvedData: Book[] | BookTrackerError = this.route.snapshot.data['resolvedBooks'];
if (resolvedData instanceof BookTrackerError) {
console.log(`Dashboard component error: ${resolvedData.friendlyMessage}`);
}
else {
this.allBooks = resolvedData;
}

//This line of code was added, to retrieve from the server instead. Instead of using resolver to get all the readers, 
//subscribe method was utilized to retrieve it all and it has 2 callbacks.
this.dataService.getAllReaders()
.subscribe(
(data: Reader[]) => this.allReaders = data,
(err: any) => console.log(err),
);
this.mostPopularBook = this.dataService.mostPopularBook;

this.title.setTitle(`Book Tracker`);
}

deleteBook(bookID: number): void {
this.dataService.deleteBook(bookID)
.subscribe(
(data: void) => {
let index: number = this.allBooks.findIndex(book => book.bookID === bookID);
this.allBooks.splice(index, 1);
},
(err: any) => console.log(err)
);
}

deleteReader(readerID: number): void {
  this.dataService.deleteReader(readerID)
  .subscribe(
  (data: void) => {
  let index: number = this.allReaders.findIndex(reader => reader.readerID === readerID);
  this.allReaders.splice(index, 1);
  },
  (err: any) => console.log(err)
  );

}
}