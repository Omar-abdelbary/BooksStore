import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

 




  // injection service http clientt to use method play apis
  private readonly _HttpClient = inject(HttpClient) ;
  private readonly _PLATFORM_ID = inject(PLATFORM_ID) ;


  // get all books
  getAllBooks():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrlForBooks}/api/d958e9f249454e9aa1d8b336970451a7/books`)
  }

// add new book
  addBook(BookInfoForm:object):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrlForBooks}/api/d958e9f249454e9aa1d8b336970451a7/books` , BookInfoForm)
  }

  //  edit book


  editBook(bookId:string , BookInfoForm:object):Observable<any> {
    return this._HttpClient.put(`${environment.baseUrlForBooks}/api/d958e9f249454e9aa1d8b336970451a7/books/${bookId}` ,BookInfoForm )
  }


// delete speacific book with id
  deleteBook(bookId:string):Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrlForBooks}/api/d958e9f249454e9aa1d8b336970451a7/books/${bookId}`)
  }
}
