import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';

@Component({templateUrl: 'admin.component.html'})
export class AdminComponent implements OnInit {

    listOfRequests = [
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
                
            }, {
                id: 5,
                subjectName: 'Subject5'
                
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
        MatrNo :  98878,
        FirstName : "Joshua",
        LastName : "Kimmich",
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
    }
]



    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {}
        

    ngOnInit() {
            console.log("inside Ng Init");
    }

    getSubjectDetails(){
        this.router.navigate(['/courseDetails']);
    }

    getDetails(matrNo : any){
        localStorage.setItem( 'selectedMatrNo' ,matrNo);
        this.router.navigate(['/courseDetails']);
      
    }
}