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
    const isSet = this.filterService.filterTags.includes(this.value);
    if (isSet) {
      this.filterService.removeFilterTag(this.value)
    } else {
      this.filterService.addFilterTag(this.value);
    }
  }

  public getIndexClass() {
    return 'btn' + this.index;
  }
}
