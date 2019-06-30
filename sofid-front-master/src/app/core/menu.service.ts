import { Injectable } from '@angular/core';
import { IMenuItem } from './model/imenu-item';

@Injectable()
export class MenuService {
  items: Array<IMenuItem>;
  constructor() { }
}
