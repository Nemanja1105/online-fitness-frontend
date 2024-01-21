import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { notEqualToValidator } from '../validators/password.validator';
import { ClientService } from '../services/Client/client.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { TokenService } from '../services/TokenService/token-service.service';
import { ChatService } from '../services/ChatService/chat.service';
import { ImageService } from '../services/Image/image.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgClass, MatPaginatorModule, ReactiveFormsModule, MatTooltipModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  collapse = false;
  lenght = 100;
  pageSize = 10;
  pageIndex = 0;
  messages: any = [];
  collapses: any = [];
  clients: any = [];
  clientId: any = null;

  form = this.fb.group({ client: ['default' as any, notEqualToValidator('default')], message: ['', Validators.required] });

  constructor(private fb: FormBuilder, private clientService: ClientService, private snackBar: CustomSnackBarService,
    private jwtService: TokenService, private chatService: ChatService, private imageService: ImageService) {
    if (this.jwtService.isLoggin()) {
      this.clientId = this.jwtService.getUser().id;
    }

    this.clientService.findAll().subscribe({
      next: (data) => { this.clients = data.filter((el: any) => el.id !== this.clientId) }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    })
    this.findAllMessageForCLient();

  }

  onBlur(control: any) {
    control.markAsTouched();
  }
  findAllMessageForCLient() {
    this.chatService.getClientMessage(this.clientId, this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.lenght = data.totalElements;
        this.messages = data.content;
        this.collapses = data.content.map(() => false);

      }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    })
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.findAllMessageForCLient();
  }


  getFormattedTime = (submittedAt: string): string => {
    const currentTime: Date = new Date();
    const timeDifference: number = Math.floor(
      (currentTime.getTime() - new Date(submittedAt).getTime()) / 1000
    );

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });


    if (timeDifference < 60) {
      return rtf.format(-timeDifference, "second");
    } else if (timeDifference < 3600) {
      return rtf.format(-Math.floor(timeDifference / 60), "minute");
    } else if (timeDifference < 86400) {
      return rtf.format(-Math.floor(timeDifference / 3600), "hour");
    } else if (timeDifference < 86400 * 2) {
      return rtf.format(-1, "day");
    } else {
      const daysAgo = Math.floor(timeDifference / 86400);
      return rtf.format(-daysAgo, "day");
    }
  };

  onCollapse(index: any, message: any) {
    this.collapses[index] = !this.collapses[index];
    if (!message.seen && message.receiver.id === this.clientId) {
      this.chatService.markAsRead(message.id).subscribe({
        next: () => {
          message.seen = true;
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

  showImageById(item: any) {
    if (this.clientId !== item.sender.id) {
      if (item?.sender?.profileImageId)
        return this.imageService.downloadImage(item?.sender?.profileImageId);
      else return '../../assets/profileIcon.png';
    }
    else {
      if (item?.receiver?.profileImageId)
        return this.imageService.downloadImage(item?.receiver?.profileImageId);
      else return '../../assets/profileIcon.png';
    }
  }

  sendMessage() {
    let tmp = this.form.value;
    let obj = { message: tmp.message, sender: this.clientId, receiver: tmp.client.id };
    this.chatService.sendMessage(obj).subscribe({
      next: (data) => {
        this.messages.unshift(data);
        this.form.reset();
        this.snackBar.openSnackBar(
          'Message successfully send',
          'close',
          true
        );

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
