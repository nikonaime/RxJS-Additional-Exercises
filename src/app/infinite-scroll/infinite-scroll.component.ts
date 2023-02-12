import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
})
export class InfiniteScrollComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer: ElementRef | undefined;

  items: any[] = [];
  itemsToDisplay: any[] = [];
  numberOfItems = 10;

  constructor() {
    for (let i = 0; i < 100; i++) {
      this.items.push({ id: i, name: 'Item ' + i });
    }
    this.itemsToDisplay = this.items.slice(0, 10);
  }

  ngAfterViewInit() {
    this.scrollContainer?.nativeElement.addEventListener(
      'scroll',
      (event: any) => {
        console.log('Scrolled', event.target);
        if (
          event.target.scrollTop + event.target.offsetHeight >=
          event.target.scrollHeight
        ) {
          this.numberOfItems += 10;
          this.itemsToDisplay = this.items.slice(0, this.numberOfItems);
        }
      }
    );
  }

  ngOnInit(): void {}
}
