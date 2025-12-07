import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { BookService } from '../../core/services/book.service';
import { ToastrService } from 'ngx-toastr';
import { Ibook } from '../../core/interfaces/ibook';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe, RouterLink , ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  // injection service to use here

  private readonly _Books = inject(BookService);
  private readonly _ToastrService = inject(ToastrService);

  // variable
  AllBooks: WritableSignal<Ibook[]> = signal([]);

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
    this._Books.deleteBook(BookId).subscribe({
      next: (res) => {
        console.log(res);

        this.AllBooks.set(res);

        this._ToastrService.success('Success Delete Book', 'BooksStore');
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
