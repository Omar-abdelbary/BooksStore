import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-managebooks',
  standalone: true,
  imports: [
    ReactiveFormsModule , CommonModule , FormsModule
  ],
  templateUrl: './managebooks.component.html',
  styleUrl: './managebooks.component.css'
})
export class ManagebooksComponent {


    // injection service to use here in the component
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _Router = inject(Router);
  private readonly _Books = inject(BookService);
  private readonly _DestroyRef = inject(DestroyRef) ;


   successAudio!: HTMLAudioElement;
  errorAudio!: HTMLAudioElement;

    constructor() {

        if (isPlatformBrowser(this._PLATFORM_ID)) {
       this.successAudio = new Audio('assets/sounds/notification-jump.wav');
       this.errorAudio = new Audio('assets/sounds/Failure_Alert.mp3');
      }

    }

  bookId: string | null = null;
  isEditMode = false;

  // unified form
  bookForm: FormGroup = this._FormBuilder.group({
    title: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    author: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    category: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    price: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    description: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.bookId = params.get('id');

      if (this.bookId) {
        // Edit Mode
        this.isEditMode = true;
        this.loadBookData(this.bookId);
      }
    });
  }

  // bring specific book data
  loadBookData(id: string) {
    this._Books.getAllBooks().pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
      next: (allBooks) => {
        let book = allBooks.find((b: any) => b._id === id);
        if (book) {
          this.bookForm.patchValue(book);
        }
      },
      error: (err: HttpErrorResponse) => {
        this._ToastrService.error('Error loading book');
      },
    });
  }

  // unified submit
  SubmitBook() {
    if (!this.bookForm.valid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode && this.bookId) {
      // update book
      this._Books.editBook(this.bookId, this.bookForm.value).pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
        next: (res) => {
          this._ToastrService.success('Book Edited Successfully', 'BooksStore');
          this._Router.navigate(['/dashboard']);
          this.successAudio.play() ;
        },
        error: (err) => this._ToastrService.error('Edit Failed'),
      });
    } else {
      // add new book
      this._Books.addBook(this.bookForm.value).pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
        next: (res) => {
          this._ToastrService.success('Book Added Successfully', 'BooksStore');
          this._Router.navigate(['/dashboard']);
          this.successAudio.play() ;
          // this.bookForm.reset();
        },
        error: (err) => this._ToastrService.error('Add Failed'),
      });
    }
  }

}
