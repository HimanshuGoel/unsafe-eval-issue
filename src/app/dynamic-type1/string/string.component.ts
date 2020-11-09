import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../common/interfaces/item.interface';


@Component({
  selector: 'app-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.scss'],
})
export class StringComponent {
  @Input() data: Item;
  @Output() changedData = new EventEmitter<Item>();

  typeValue = 'String';

  constructor() {}

  emitChanges(): void {
    this.data.type = this.typeValue;
    this.changedData.emit(this.data);
  }
}
