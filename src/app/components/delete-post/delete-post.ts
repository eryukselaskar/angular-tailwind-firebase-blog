import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router,RouterLink } from '@angular/router';
import { doc, deleteDoc, getDoc, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-delete-post',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './delete-post.html',
})
export class DeletePost implements OnInit {
  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  post: any = null;
  postId = '';

  async ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id') || '';
    const ref = doc(this.firestore, 'posts', this.postId);
    const snap = await getDoc(ref);
    if (snap.exists()) this.post = snap.data();
  }

  async confirmDelete() {
    if (!this.postId) return;
    await deleteDoc(doc(this.firestore, 'posts', this.postId));
    alert('Yazı silindi.');
    this.router.navigate(['/']);
  }
}
