import { Component } from '@angular/core';
import { CategoriesService } from '../services/Categories/categories.service';
import { TokenService } from '../services/TokenService/token-service.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent {
  categories: any = [];
  clientId: any = null;
  constructor(private categoriesService: CategoriesService, private jwtService: TokenService, private snackBar: CustomSnackBarService) {
    this.clientId = this.jwtService.getUser().id;
    this.categoriesService.findAllForClient(this.clientId).subscribe({
      next: (data) => {
        this.categories = data;
      }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    })
  }

  subscribeChange(item: any) {
    console.log(item);
    this.categoriesService.changeSubForClient(item.id, this.clientId).subscribe({
      next: () => {
        if (!item.subscribed) {
          item.subscribed = true;
          this.snackBar.openSnackBar(
            'Client successfully subscribed to category',
            'close',
            true
          );

        }
        else {
          item.subscribed = false;
          this.snackBar.openSnackBar(
            'Client successfully unsubscribed to category',
            'close',
            true
          );
        }
      }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    })
  }
}
