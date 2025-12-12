import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { BookService } from '../../core/services/book.service';
import { ToastrService } from 'ngx-toastr';
import { Ibook } from '../../core/interfaces/ibook';
import { CurrencyPipe } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe, RouterLink ,FormsModule , SearchPipe ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  // injection service to use here

  private readonly _Books = inject(BookService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _DestroyRef = inject(DestroyRef) ;

  // variable
  AllBooks: WritableSignal<Ibook[]> = signal([]);

  // search book name
  bookName : string = "" ;

  ngOnInit(): void {
    this._Books.getAllBooks().subscribe({
      next: (res) => {
        // console.log(res);
        this.AllBooks.set(res);
        // console.log(this.AllBooks());
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  // delete book

  deleteBook(BookId: string) {
    this._Books.deleteBook(BookId).pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
      next: (res) => {
        console.log(res);

       const updated = this.AllBooks()
          .filter(book => book._id !== BookId);

        this.AllBooks.set(updated);

        this._ToastrService.success('Success Delete Book', 'BooksStore');
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
