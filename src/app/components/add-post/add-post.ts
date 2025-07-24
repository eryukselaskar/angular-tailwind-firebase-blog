import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BlogService } from '../../services/blog';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorModule],
  templateUrl: './add-post.html',
  styleUrls: ['./add-post.css'],
})
export class AddPost {
  newPost = {
    title: '',
    content: '',
    coverImage: '',
  };

  constructor(private blogService: BlogService) {}

  async addPost() {
    if (
      !this.newPost.title ||
      !this.newPost.content ||
      !this.newPost.coverImage
    )
      return;

    await this.blogService.addPost(this.newPost);

    this.newPost = { title: '', coverImage: '', content: '' };
    alert('Yazı eklendi!');
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
