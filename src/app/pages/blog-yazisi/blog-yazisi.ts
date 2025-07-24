import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog';

@Component({
  selector: 'app-blog-yazisi',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-yazisi.html',
  styleUrls: ['./blog-yazisi.css']
})
export class BlogYazisi implements OnInit {
  post: any = null;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.post = await this.blogService.getPostBySlug(slug);
    }
  }
}
