import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private firestore: Firestore) {}

  // Blog yazılarını getir
  getPosts(): Observable<any[]> {
    const postsRef = collection(this.firestore, 'posts');
    return collectionData(postsRef, { idField: 'id' });
  }

  // Yeni blog yazısı ekle
  addPost(post: { title: string; content: string; createdAt: Date }) {
    const postsRef = collection(this.firestore, 'posts');
    return addDoc(postsRef, post);
  }
}
