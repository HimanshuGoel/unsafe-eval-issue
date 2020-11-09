import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../common/interfaces/item.interface';


@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
})
export class NumberComponent {
  @Input() data: Item;
  @Output() changedData = new EventEmitter<Item>();

  typeValue = 'Number';

  constructor() {}

  emitChanges(): void {
    this.data.type = this.typeValue;
    this.changedData.emit(this.data);
  }
}
