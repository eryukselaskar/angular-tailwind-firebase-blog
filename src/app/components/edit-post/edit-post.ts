import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorModule],
  templateUrl: './edit-post.html',
  styleUrl: './edit-post.css',
})
export class EditPost implements OnInit {
  route = inject(ActivatedRoute);
  firestore = inject(Firestore);

  postId = '';
  postData: any = {
    title: '',
    content: '',
    coverImage: '',
  };

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

  async ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id') || '';
    const postRef = doc(this.firestore, 'posts', this.postId);
    const snap = await getDoc(postRef);

    if (snap.exists()) {
      this.postData = snap.data();
    }
  }

  async updatePost() {
    if (!this.postData.title || !this.postData.content || !this.postData.coverImage) return;

    const postRef = doc(this.firestore, 'posts', this.postId);
    await setDoc(postRef, {
      ...this.postData,
      updatedAt: new Date()
    });

    alert('Yazı güncellendi!');
  }
}
