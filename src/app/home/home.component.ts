import {Component, OnInit, NgModule, ViewChild} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule,FormBuilder,FormArray,ValidatorFn} from '@angular/forms';
import { first,map,mergeMap } from 'rxjs/operators';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { User } from '../_models';
import { UserService } from '../_services';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import './home.css';



@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
 form: FormGroup;
 message: string;
 uploadStatusDisplay : boolean = false;
 submitButtonDisabled : boolean = true;
 //imageLoader : any = "../assets/loader.png"
 restItemsUrl = 'http://b82842aa.ngrok.io/extractFromPDF';
 dataProcessingAPI = 'http://2a86a0ad.ngrok.io/compareData';
 base64 : string;
 subjectJSON : any;
    currentUser: User;
    restItems: any;
    users: User[] = [];
    isNotSubmitted: boolean;
    subjects : any[] =[];
    
   
    constructor(private userService: UserService,private formBuilder: FormBuilder,private http: HttpClient) {
    const controls = this.subjects.map(c => new FormControl(false));
 
    this.message='';
    this.form = this.formBuilder.group({
       subjects: new FormArray(controls)
    });
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isNotSubmitted=true;
        console.log(this.isNotSubmitted);
        
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

//    submitForApproval() {
//         let result :any = this.getRestItems(this.base64);
//         localStorage.setItem('subjectOCRResult', result);
//         this.isNotSubmitted=false;
//     }

     submitForApproval() {
    //  this.getRestItems(this.base64);
    // console.log(val);
        //console.log('After Await' + result);
       // localStorage.setItem('subjectOCRResult', result);
        this.isNotSubmitted=false;
    }



    convertToBase64(){
          //Read File
    let selectedFiles = document.getElementById("inputFile");
    //let selectedFile = selectedFiles.files;
    let selectedFile = (<HTMLInputElement>selectedFiles).files;
    //console.log(selectedFile);
    let fileToLoad;
    //Check File is not Empty
    if (selectedFile.length > 0) {
      // Select the very first file from list
      fileToLoad = selectedFile[0];
      //console.log(selectedFile.length);
      let fileReader = new FileReader();
      // Onload of file read the file content
      fileReader.onload = (fileLoadedEvent) => {
        this.uploadStatusDisplay = true;
        this.base64 = fileLoadedEvent.target.result;
        console.log(this.base64);
        this.getRestItems(this.base64);
      }
      // Print data in console
      // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    //  console.log(base64);
      //let pdfBase64String : any = base64;

    }
    }

// Read all REST Items
getRestItems(base64){
    this.restItemsServiceGetRestItems(base64)
      .subscribe( 
        restItems => {
            console.log("Before Await");
        //   this.restItems = restItems;
        //   console.log(this.restItems);
          this.subjectJSON = restItems;  
          console.log("187");
          console.log(this.subjectJSON);  
          this.subjects = this.subjectJSON.result;
          this.uploadStatusDisplay = false; 
          this.submitButtonDisabled = false;  
          for(let key in this.subjects){
              console.log(this.subjects[key]);
          }
        }
      )
      return this.subjectJSON;
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems(base64) {
    let url = this.restItemsUrl;
    console.log("URL:" + url);
  /*  return this.http
      .get<any[]>(url)
      .pipe(map(data => data));*/

     let payload = {  'encString': base64 };
     //let payload = {  'encString': 'hi' };
      //let jsonObj = JSON.stringify(payload);
      //let payload = {  'data': 'hi'  };
      console.log(payload);
    //   return this.http
    //       .post<any[]>(this.restItemsUrl,payload)
    //       .pipe(map(data =>data))
    return this.http
    .post<any[]>(this.restItemsUrl,payload)
    .pipe(mergeMap(data => this.http.post(this.dataProcessingAPI,{'OCRSubjects': ''+ data }).pipe(map(result=>result))))
  }
    
    
submit(){
    const selectedOrderIds = this.form.value.subjects
      .map((v : any, i : any) => v ? this.subjects[i].subjectName : null)
      .filter((v : any) => v !== null);
      if(selectedOrderIds.length>2){
      this.message="Max of 2 can be selected";
      }
      else{
      this.message="Submitted for approval";
      }
    console.log(selectedOrderIds);
}

}