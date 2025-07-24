import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BlogService } from '../../services/blog';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule, RouterModule],
})
export class AdminComponent implements OnInit {
  yazilar: any[] = [];

  constructor(
    private blogService: BlogService,
    private router: Router,
    private authService: AuthService
  ) {}
  
  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.loadPosts(); // sadece giriş varsa yükle
      }
    });
  }
  loadPosts() {
    this.blogService.getPosts().subscribe((data) => {
      this.yazilar = data;
    });
  }

  async delete(id: string) {
    const confirmDelete = confirm(
      'Bu yazıyı silmek istediğinize emin misiniz?'
    );
    if (!confirmDelete) return;
    try {
      await this.blogService.deletePost(id);
      alert('Yazi başarıyla silindi.');
      this.loadPosts();
    } catch (error) {
      alert('Silme işlemi başarısız oldu.');
      console.error(error);
    }
  }
  update(id: string) {
    this.router.navigate(['/duzenle', id]);
  }
  logout(){
    this.authService.logout();
  }
}
