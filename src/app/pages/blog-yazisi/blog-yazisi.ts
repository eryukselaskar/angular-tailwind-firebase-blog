import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-yazisi',
  imports: [CommonModule,RouterLink],
  templateUrl: './blog-yazisi.html',
  styleUrl: './blog-yazisi.css'
})
export class BlogYazisi implements OnInit {

  route = inject(ActivatedRoute);
  firestore = inject(Firestore);
  post: any = null;

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      const postsRef = collection(this.firestore, 'posts');
      const q = query(postsRef, where('slug', '==', slug));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        this.post = querySnapshot.docs[0].data();
      }
    }
  }
  
}
