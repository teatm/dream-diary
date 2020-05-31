import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { ItemCategoryService } from '../../services/item-category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  item = null;
  itemCategories = null;
  message = '';

  constructor(private itemService: ItemService, 
              private itemCategoryService: ItemCategoryService, 
              private route: ActivatedRoute, 
              private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getItem(this.route.snapshot.paramMap.get('id'));
    this.retrieveItemCategories();
  }

  getItem(id) {
    this.itemService.get(id)
      .subscribe(
        data => {
          this.item = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  updateItem() {
    this.itemService.update(this.item.id, this.item)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The item was updated successfully';
          this.router.navigate(['item-list']);
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteItem() {
    this.itemService.delete(this.item.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['item-list']);
        },
        error => {
          console.log(error);
        }
      )
  }

  retrieveItemCategories() {
    this.itemCategoryService.getAll()
      .subscribe(
        data => {
          this.itemCategories = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  backToList() {
    this.router.navigate(['item-list']);
  }
}
