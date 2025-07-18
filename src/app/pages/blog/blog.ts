import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { BlogService } from '../../services/blog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';





@Component({
  selector: 'app-blog',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog implements OnInit {

  posts: any[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  
}
