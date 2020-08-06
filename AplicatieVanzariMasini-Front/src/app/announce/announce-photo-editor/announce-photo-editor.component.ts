import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { PhotoForAnnounce } from "../../_models/photoForAnnounce";
import { AlertifyService } from "../../_services/alertify.service";
import { environment } from "src/environments/environment";
import { AnnounceService } from "../../_services/announce.service";
import { AuthService } from "../../_services/auth.service";
import { UserService } from "../../_services/user.service";

@Component({
  selector: "app-announce-photo-editor",
  templateUrl: "./announce-photo-editor.component.html",
  styleUrls: ["./announce-photo-editor.component.css"],
})
export class AnnouncePhotoEditorComponent implements OnInit {
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  @Input() announcePhotos: PhotoForAnnounce[];
  @Input() announceId: number;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(
    private authService: AuthService,
    private announceService: AnnounceService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.initializeUploader();
    console.log(this.announceId);
    console.log(this.announcePhotos);
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        "users/" +
        this.authService.decodedToken.nameid +
        "/photos/" +
        this.announceId +
        "/announcephotos",
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: PhotoForAnnounce = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
          isApproved: res.isApproved,
          announceId: res.announceId
        };
        this.announcePhotos.push(photo);
      }
    };
  }

  deleteAnnouncePhoto(announceId: number, id: number) {
    this.alertify.confirm("Esti sigur ca vrei sa stergi imaginea?", () => {
      this.announceService
        .deleteAnnouncePhoto(this.authService.decodedToken.nameid, announceId, id)
        .subscribe(
          () => {
            this.announcePhotos.splice(
              this.announcePhotos.findIndex((p) => p.id === id),
              1
            );
            this.alertify.success("Imaginea a fost stearsa");
          },
          (error) => {
            this.alertify.error("Eroare la stergerea imaginii");
          }
        );
    });
  }
}
