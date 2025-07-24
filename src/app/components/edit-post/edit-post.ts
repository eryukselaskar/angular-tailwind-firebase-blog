import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BlogService } from '../../services/blog';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorModule],
  templateUrl: './edit-post.html',
  styleUrls: ['./edit-post.css'],
})
export class EditPost implements OnInit {
  postId = '';
  postData: any = {
    title: '',
    content: '',
    coverImage: '',
  };

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

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
    this.postData = await this.blogService.getPostById(this.postId);
  }

  async updatePost() {
    if (!this.postData.title || !this.postData.content || !this.postData.coverImage) return;

    await this.blogService.updatePost(this.postId, this.postData);

    alert('Yazı güncellendi!');
  }
}
