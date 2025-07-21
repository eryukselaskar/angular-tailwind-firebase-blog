import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { v4 as uuidv4 } from 'uuid';
import {
  collection,
  Firestore,
  addDoc,
  doc,
  setDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorModule],
  templateUrl: './add-post.html',
  styleUrl: './add-post.css',
})
export class AddPost {
  newPost = {
    title: '',
    content: '',
    coverImage: '',
  };

  constructor(private firestore: Firestore) {}

  async addPost() {
    if (!this.newPost.title || !this.newPost.content || !this.newPost.coverImage) return;
  
    const id = uuidv4();
    const slug = this.generateSlug(this.newPost.title);
  
    const post = {
      id,
      slug,
      ...this.newPost,
      createdAt: new Date(),
    };
  
    const postsRef = doc(this.firestore, 'posts', id);
    await setDoc(postsRef, post);
  
    this.newPost = { title: '', coverImage: '', content: '' };
    alert('Yazı eklendi!');
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
  editorConfig = {
    menubar: false,
    plugins:
      'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
    toolbar:
      'undo redo |  blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview |',

    font_size_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
    autoresize_bottom_margin: 50,
    autoresize_overflow_padding: 50,

    content_style: `
      body {
        font-family:Helvetica,Arial,sans-serif;
        font-size:14px;
      }
    `,
  };
}
