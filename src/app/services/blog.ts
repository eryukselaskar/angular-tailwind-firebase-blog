import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  query,
  orderBy,
  deleteDoc,
  doc,
  where,
  getDocs,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private firestore: Firestore) {}

  // Blog yazılarını getir
  getPosts(): Observable<any[]> {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' });
  }

  // Yeni blog yazısı ekle
  addPost(post: { title: string; content: string; coverImage?: string }) {
    const id = uuidv4();
    const slug = this.generateSlug(post.title);
  
    const newPost = {
      id,
      slug,
      ...post,
      createdAt: new Date(),
    };
  
    const postsRef = doc(this.firestore, 'posts', id);
    return setDoc(postsRef, newPost);
  }

  private generateSlug(title: string): string {
    const turkishMap: { [key: string]: string } = {
      ç: 'c',
      Ç: 'c',
      ğ: 'g',
      Ğ: 'g',
      ı: 'i',
      İ: 'i',
      ö: 'o',
      Ö: 'o',
      ş: 's',
      Ş: 's',
      ü: 'u',
      Ü: 'u',
    };

    const cleaned = title
      .split('')
      .map((char) => turkishMap[char] || char)
      .join('')
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');

    return cleaned;
  }

  deletePost(id: string) {
    const postRef = doc(this.firestore, 'posts', id);
    return deleteDoc(postRef);
  }

  getPostBySlug(slug: string): Promise<any | null> {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, where('slug', '==', slug));
    return getDocs(q).then((snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        return { id: snapshot.docs[0].id, ...data };
      }
      return null;
    });
  }
  async getPostById(id: string): Promise<any | null> {
    const postRef = doc(this.firestore, 'posts', id);
    const snap = await getDoc(postRef);
  
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
    return null;
  }
  
  async updatePost(id: string, data: any): Promise<void> {
    const postRef = doc(this.firestore, 'posts', id);
    await setDoc(postRef, {
      ...data,
      updatedAt: new Date()
    });
  }
}
