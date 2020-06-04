import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items;
  selectedItem;
  selectedIndex = -1;
  name = '';

  searchTerm: FormControl = new FormControl();
  searchItems = <any>[];

  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveItems();

    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term != "") {
          this.itemService.search(term).subscribe(
            data => {
              this.searchItems = data as any[];
            }
          )
        }
      }
    )
  }

  retrieveItems() {
    this.itemService.getAll()
      .subscribe(
        data => {
          this.items = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  refreshList() {
    this.retrieveItems();
    this.selectedItem = null;
    this.selectedIndex = -1;
  }

  setActiveItem(item, index) {
    this.selectedItem = item;
    this.selectedIndex = index;

    this.router.navigate(['item/', item.id]);
  }

  searchName() {
    this.itemService.findByName(this.name)
      .subscribe(
        data => {
          this.items = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
}
