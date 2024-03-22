import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm!: FormGroup;
  responseData: any;
  message: string = ''; 
  messageType: string = '';
  
  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      targets: ['', Validators.required],
      exclude_targets: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
  
      const targetsArray = formData.targets.split(',').map((target: string) => target.trim());
      const excludeTargetsArray = formData.exclude_targets.split(',').map((target: string) => target.trim());
  
      const dataToSend = {
        targets: targetsArray,
        exclude_targets: excludeTargetsArray
      };

      console.log(dataToSend);
  
      this.dataService.postData(dataToSend).subscribe(response => {
        this.responseData = response;
        console.log(response);
        this.message = response.message;
        this.messageType = response.type;
      });
    }
  }
}
