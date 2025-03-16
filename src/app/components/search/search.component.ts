import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/UIModels';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgFor,
    NgIf,
    MatIconModule,
    RouterModule
  ]
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  users: User[] = [];
  filteredUsers: User[] = [];
  isFocused: boolean = false;

  constructor(private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().then(users => {
      this.users = users;
      this.filteredUsers = users;
    });

    this.searchControl.valueChanges.subscribe(value => {
      this.filterUsers(value || '');
    });
  }

  filterUsers(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredUsers = this.users;
      return;
    }

    this.filteredUsers = this.users.filter(user =>
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  hideUsersList() {
    setTimeout(() => {
      this.isFocused = false;
    }, 100); 
  }

  goToProfile(userID : string){
    this.router.navigate(['/profile', userID]);
  }
}
