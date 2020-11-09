import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';

import { StringComponent } from './string/string.component';
import { NumberComponent } from './number/number.component';
import { ComponentType } from '../common/interfaces/component-type.interface';
import { Item } from '../common/interfaces/item.interface';


@Component({
  selector: 'app-dynamic-type1',
  templateUrl: './dynamic-type1.component.html',
  styleUrls: ['./dynamic-type1.component.scss'],
})
export class DynamicType1Component implements OnInit {
  components: ComponentType[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  addField(type: string, data: Item): void {
    let component: any;
    switch (type) {
      case 'string':
        component = StringComponent;
        break;
      case 'number':
        component = NumberComponent;
        break;
    }

    const childComponent = this.componentFactoryResolver.resolveComponentFactory(
      component
    );

    const compAndData = new ComponentType();
    compAndData.component = childComponent;
    compAndData.data = data;
    this.components.push(compAndData);
  }

  getComponentData(): void {
    this.components.forEach((component) => {
      console.log(component.data);
    });
  }

  onCompDataChanged(item: Item): void {
    console.log('item:', item);
    const field = this.components.filter((a) => a.data.id === item.id);
    field[0].data = item;
  }

  ngOnInit(): void {
    const data1: Item = { value: 'This is the 1st component', id: '1' };
    this.addField('string', data1);
    const data2: Item = { value: 'This is the 2nd component', id: '2' };
    this.addField('string', data2);
    const data3: Item = { value: 'This is the 3rd component', id: '3' };
    this.addField('number', data3);
  }
}
