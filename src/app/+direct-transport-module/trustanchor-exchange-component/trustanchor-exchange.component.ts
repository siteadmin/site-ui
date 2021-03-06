/**
 * Created by Brian on 1/23/2017.
 */
import {Component, ViewChild} from "@angular/core";
import {TrustanchorUploadService} from "../../shared/trustanchor-upload.service";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {environment} from "../../../environments/environment";

const URL = environment.trustanchor_upload_url;
const TRUSTBUNDLE_DOWNLOAD_URL = environment.trustbundle_download_url;
const host_url = environment.host_url;

@Component({
    selector: 'trustanchor-exchange-component',
    templateUrl: 'trustanchor-exchange.component.html',
    styleUrls: ['trustanchor-exchange.component.css']
})
export class TrustAnchorExchangeComponent{
    @ViewChild('blockModal') blockModal:ModalComponent;
    filesToUpload: Array<File>;
    public trustbundleDownloadUrl : string = TRUSTBUNDLE_DOWNLOAD_URL;
    public uploadResults: any = {};
    public host_url: string;
    
    constructor(private trustanchorUploadService:TrustanchorUploadService){
        this.filesToUpload = [];
        this.host_url = host_url;
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }

    onSubmit(form: any): void {
        this.blockModal.open().then(() => {
            this.trustanchorUploadService.uploadTrustanchor(URL, this.filesToUpload).then((result: any) => {
                this.uploadResults = result;
                this.blockModal.close();
            }).catch((err) => {
                this.blockModal.close();
                this.uploadResults.success = false;
                this.uploadResults.message = "System error while uploading the file."
                console.log(err);
            });
        });
    }

    clearUploadResults(){
        this.uploadResults = null;
    }
}