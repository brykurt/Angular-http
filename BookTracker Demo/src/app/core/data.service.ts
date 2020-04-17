import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

import { allBooks, allReaders } from "../data";
import { Reader } from "../models/reader";
import { Book } from "../models/book";
import { BookTrackerError } from "../models/bookTrackerError";
import { OldBook } from "../models/oldBook";
import { ReaderTrackerError } from "../models/readerTrackerError";

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllBooks(): Observable<Book[] | BookTrackerError> {
    console.log("Getting all books from the server.");
    return this.http
      .get<Book[]>("/api/books")
      .pipe(catchError((err) => this.handleHttpError(err)));
  }

  private handleHttpError(
    error: HttpErrorResponse
  ): Observable<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = "An error occurred retrieving data.";
    return throwError(dataError);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`/api/books/${id}`, {
      headers: new HttpHeaders({
        Accept: "application/json",
        Authorization: "my-token",
      }),
    });
  }

  getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`/api/books/${id}`).pipe(
      map(
        (b) =>
          <OldBook>{
            bookTitle: b.title,
            year: b.publicationYear,
          }
      ),
      tap((classicBook) => console.log(classicBook))
    );
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>("/api/books", newBook, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  updateBook(updatedBook: Book): Observable<void> {
    return this.http.put<void>(
      `/api/books/${updatedBook.bookID}`,
      updatedBook,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  deleteBook(bookID: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${bookID}`);
  }


  //  All reader functions

  //This function returns the entire record of readers. 
  //It has as an observable type and reader tracker error return type
  getAllReaders(): Observable<Reader[] | ReaderTrackerError> {
    console.log("Getting all readers from the server.");
    return this.http
      .get<Reader[]>("/api/readers")
      .pipe(catchError((err) => this.handleHttpError(err)));
  }

  //This function returns a single item according to its i.d and it also used get verb to retrieve the item
  //The Httpheaders ensure the format will be in json when returned
  getReaderById(id: number): Observable<Reader> {
    return this.http.get<Reader>(`/api/readers/${id}`, {
      headers: new HttpHeaders({
        Accept: "application/json",
       
      }),
    });
  }

  //This function returns post verb and we assigned the Reader class to the parameter and it has return type of observable reader.
  addReader(newReader: Reader): Observable<Reader> {
    return this.http.post<Reader>("/api/readers", newReader, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  //This function updates the class reader (except the i.d) according to the i.d and it has no return by convention.
  //It also uses http headers
  updateReader(updatedReader: Reader): Observable<void> {
    return this.http.put<void>(
      `/api/readers/${updatedReader.readerID}`,
      updatedReader,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  //This function deletes the reader based on its i.d 
  deleteReader(readerID: number): Observable<void> {
    return this.http.delete<void>(`/api/readers/${readerID}`);
  }

 
}
