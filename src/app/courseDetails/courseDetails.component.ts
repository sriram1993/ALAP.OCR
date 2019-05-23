import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule,FormBuilder,FormArray,ValidatorFn} from '@angular/forms';
import { first } from 'rxjs/operators';
import * as jspdf from 'jspdf';  
import * as html2canvas  from 'html2canvas';
import { AlertService, AuthenticationService } from '../_services';

@Component({templateUrl: 'courseDetails.component.html'})
export class CourseDetailsComponent implements OnInit {
    form : FormGroup;
    
     pdfSrc: string = '../assets/TransComp.pdf';
     message:string;
    listofRequest = [
        {
        MatrNo :  26756,
        FirstName : "Thomas",
        LastName : "Muller",
        CourseName : "MIE",
        subjects: [
            {
                id: 1,
                subjectName: 'Subject1'
                
            }, {
                id: 2,
                subjectName: 'Subject2'
                
            }, {
                id: 3,
                subjectName: 'Subject3' 
                
            }
        ]
    },
    {
        MatrNo :  28787,
        FirstName : "Per",
        LastName : "Mertesacker",
        CourseName : "MIE",
        subjects: [
            {
                id: 1,
                subjectName: 'Subject1'
                
            }, {
                id: 2,
                subjectName: 'Subject2'
                
            }, {
                id: 3,
                subjectName: 'Subject3' 
                
            },{
                id: 4,
                subjectName: 'Subject4'
                
            }, {
                id: 5,
                subjectName: 'Subject5'
                
            }
        ]
    },
    {
        MatrNo :  34455,
        FirstName : "Toni",
        LastName : "Kroos",
        CourseName : "MIE",
        subjects: [
            {
                id: 1,
                subjectName: 'Subject1'
                
            }, {
                id: 2,
                subjectName: 'Subject2'
                
            }, {
                id: 3,
                subjectName: 'Subject3' 
                
            },{
                id: 4,
                subjectName: 'Subject4'
                
            }
        ]
    },
    {
        MatrNo :  45666,
        FirstName : "Timo",
        LastName : "Werner",
        CourseName : "MIE",
        subjects: [
            {
                id: 1,
                subjectName: 'Subject1'
                
            }, {
                id: 2,
                subjectName: 'Subject2'
                
            }, {
                id: 5,
                subjectName: 'Subject5'
                
            }
        ]
    },
    {
        MatrNo :  98878,
        FirstName : "Joshua",
        LastName : "Kimmich",
        CourseName : "MIE",
        subjects: [
            {
                id: 4,
                subjectName: 'Subject4'
                
            }, {
                id: 5,
                subjectName: 'Subject5'
                
            }
        ]
    }
]

 selectedRequest : any = {};
 tempSubjects : any =[];
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
            console.log("Const"+localStorage.getItem('selectedMatrNo'));
            let selectedMatrNo = localStorage.getItem('selectedMatrNo');
            this.listofRequest.forEach(request=> {
                if(selectedMatrNo == request.MatrNo+""){
                    this.selectedRequest = request;
                    this.tempSubjects = this.selectedRequest.subjects;
                    console.log("TempSub"+ this.tempSubjects[0].subjectName);
                }
            });
            console.log("request:" + this.selectedRequest.FirstName);
            this.message="";

            // 
            const controls = this.tempSubjects.map((c:any) => new FormControl(false));
             controls.forEach((i:any,index:any)=>{
                 console.log("i" + index)
                controls[index].setValue(true);
            })  
             this.form = this.formBuilder.group({
                tempSubjects: new FormArray(controls)
            });
        }
        

        downloadPDF(){
        var data = document.getElementById('courseContainer');  
        html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        var imgWidth = 208;   
        var pageHeight = 295;    
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
    
        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
        var position = 0;  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
        pdf.save(this.selectedRequest.MatrNo+'_Approved.pdf'); // Generated PDF   
        }); 
    }
    ngOnInit() {
            
    }

    approve(){
        const approvedSubjects = this.form.value.tempSubjects
        .map((v : any, i : any) => v ? this.tempSubjects[i].subjectName : null)
        .filter((v : any) => v !== null);
        this.message='Request made by '+this.selectedRequest.FirstName+' ' +this.selectedRequest.LastName+' is approved'
      console.log(approvedSubjects); 
    }

    submit(){
        console.log("Submit");
    }


    
   
}