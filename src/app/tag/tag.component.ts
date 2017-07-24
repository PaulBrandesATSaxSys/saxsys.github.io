import { Component, Input } from '@angular/core';
import { FilterService } from './../services/filter.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent {
  @Input() value: string;
  @Input() isHeader: boolean;
  @Input() index: number;

  constructor(public filterService: FilterService) {}

  public tagButtonClick(): void {
    if (this.filterService.filterTag !== this.value) {
      this.filterService.filterTag = this.value;
    } else {
      this.filterService.filterTag = null;
    }
  }

  public getIndexClass() {
    return 'btn' + this.index;
  }
}
