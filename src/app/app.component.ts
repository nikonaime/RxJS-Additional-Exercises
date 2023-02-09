import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { fromEvent, Observable } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rxjs';
  txtValue: boolean = true;

  @ViewChild('searchInput', { static: true }) searchInput:
    | ElementRef
    | undefined;
  @ViewChild('result', { static: true }) result: ElementRef | undefined | any;
  @Input() itemsList: { name: string }[] = [
    { name: 'sandro bakhtadze' },
    { name: 'levani begashvili' },
    { name: 'luka botchorishvili' },
    { name: 'giorgi chaphichadze' },
    { name: 'elene chelidze' },
    { name: 'irakli chkhirodze' },
    { name: 'galaktion danelia' },
    { name: 'erekle dateshidze' },
    { name: 'gurami dgebuadze' },
    { name: 'irakli galogre' },
    { name: 'tinatin gogatishvili' },
    { name: 'qeti gogia' },
    { name: 'mamuka jincharadze' },
    { name: 'lasha jugeli' },
    { name: 'alexander korashvili' },
    { name: 'iakobi kortua' },
    { name: 'maiko modebadze' },
    { name: 'ani mtchedlidze' },
    { name: 'vazha norakidze' },
    { name: 'giorgi otiashvili' },
    { name: 'demetre panjakidze' },
    { name: 'lida shubitidze' },
    { name: 'akaki spanderashvili' },
    { name: 'levani tsereteli' },
    { name: 'nika tsiklauri' },
    { name: 'tsitsino tsitsilashvili' },
    { name: 'niko nagervadze' },
    { name: 'giorgi bazerashvili' },
    { name: 'besarion gagelidze' },
  ];

  ngOnInit() {
    const search$ = fromEvent(this.searchInput?.nativeElement, 'input').pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => {
        return new Observable((observer) => {
          const filteredItems = this.itemsList.filter((item) =>
            item.name.includes(value)
          );
          observer.next(filteredItems);
        });
      })
    );

    search$.subscribe((filteredItems: any) => {
      this.result.nativeElement.innerHTML =
        filteredItems.length > 0
          ? filteredItems.map((item: any) => item.name).join(', ')
          : '';
    });
  }
}
