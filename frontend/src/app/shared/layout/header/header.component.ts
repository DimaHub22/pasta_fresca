import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ServiceAuthService} from "../../services/service-auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {CommentService} from "../../services/comment.service";
import {CategoriesService} from "../../services/categories.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,AfterViewInit {
  @ViewChild('header') headerRef!:ElementRef
  categories: { _id: string, name: string }[] = []

  commentForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    comment: [''],
    raiting: ['']
  })
  isLogget: boolean = false
  time: number = new Date().getHours()
  timeWork: boolean = false

  modalOpen: boolean = false
  modalLocation: boolean = false

  constructor(private serviceAuth: ServiceAuthService,
              private fb: FormBuilder,
              private commentService: CommentService,
              private categoryService: CategoriesService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private scroller: ViewportScroller) {
  }
  ngAfterViewInit() {

  }

  ngOnInit(): void {

    if (this.time >= 12 && this.time < 23) {
      this.timeWork = true
    } else {
      this.timeWork = false
    }

    this.categoryService.getCategory()
      .subscribe({
        next: (data => {
          this.categories = data
        }),
        error: (e => {
          console.log(e)
        })
      })

    this.isLogget = !!this.serviceAuth.getToken()
  }


  openModal(modal: string) {
    if (modal === 'comment') {
      this.modalOpen = true
    } else {
      this.modalLocation = true
    }

  }

  onSubmint() {
    if (this.commentForm.value.comment) {


    if (this.commentForm.value.raiting) {
      if (this.commentForm.valid && this.commentForm.value.name && this.commentForm.value.email && this.commentForm.value.comment && this.commentForm.value.raiting) {
        this.commentService.sendMessage(this.commentForm.value.name, this.commentForm.value.email, this.commentForm.value.comment, this.commentForm.value.raiting)
          .subscribe({
            next: (data => {
              this.commentForm.reset()
              this.modalOpen = false
            }),
            error: (e => {

            })
          })
      }
    } else {
      this._snackBar.open('Выбирите оценку')
    }
  }else{
      this._snackBar.open('Оставте комментарий')
    }

  }

  scrollTo() {
    this.scroller.scrollToAnchor('headerNav')

  }
}
