import { Pipe, PipeTransform } from '@angular/core';
import { Ibook } from '../interfaces/ibook';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(allBooks:Ibook[] , BookTitle:string): Ibook[] {
    return allBooks.filter( (item)=>item.title.includes(BookTitle) );
  }

}
