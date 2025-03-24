import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/UIModels';
import { UserService } from '../../services/user.service';
import { UiComponentsModule } from '../../shared/ui-components.module';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowService } from '../../services/follow.service';
import { Subscription } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [UiComponentsModule, MatTabsModule],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.scss'
})
export class FollowersComponent implements OnInit, OnDestroy {
  followers: User[] = [];
  following: User[] = [];
  headerTitle: string = '';
  userId: string;
  private routeSub!: Subscription;

  constructor(
    private userService: UserService,
    private followService: FollowService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const newId = params.get('id');
      if (newId && newId !== this.userId) {
        this.userId = newId;
        this.loadData();
      }
    });

    this.loadData();
  }

  async loadData() {
    if (this.userId) {
      const user = await this.userService.getUserById(this.userId);
      this.headerTitle = user?.displayName ?? '';
      
      // Load followers
      const followersSnapshot = await this.followService.getFollowers(this.userId);
      const followersUsers = await Promise.all(
        followersSnapshot.docs.map(async (doc) => {
          const followerId = doc.data()['followerId'];
          const user = await this.userService.getUserById(followerId);
          return user;
        })
      );
      this.followers = followersUsers.filter((user): user is User => user !== null);

      // Load following
      const followingSnapshot = await this.followService.getFollowing(this.userId);
      const followingUsers = await Promise.all(
        followingSnapshot.docs.map(async (doc) => {
          const followedId = doc.data()['followedId'];
          const user = await this.userService.getUserById(followedId);
          return user;
        })
      );
      this.following = followingUsers.filter((user): user is User => user !== null);
    }
  }

  goToProfile(userId: string) {
    this.router.navigate(['/profile', userId]);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
} 