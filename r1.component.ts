import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { formatDate, DatePipe } from '@angular/common';
import { Indentmodel } from '../../../Models/indentmodel';
import {  MatTableDataSource } from '@angular/material';
import { NotificationService } from '../../../shared/notification.service';


@Component({
  selector: 'app-r1',
  templateUrl: './r1.component.html',
  styleUrls: ['./r1.component.css']
})
export class R1Component implements OnInit {
  
 
  constructor(private fb:FormBuilder,private notify:NotificationService) { }

  departments = [
    { id: 1,value:'Dep 1'},
    { id: 2,value:'Dep 2'},
    { id: 3,value:'Dep 3'},
    { id: 4,value:'Dep 4'}];

  indentlist : MatTableDataSource<any>;
  displayColumns : string[] = ["srno","desc","qty","price","manufacturer","remark","sugvend","delivery"]

  ngOnInit() {
  }

  

  /* indent= new FormGroup({
    $key: new FormControl(null),
    dept: new FormControl(''),
    date: new FormControl(''),
    budget: new FormControl('', Validators.required),
    project: new FormControl(''),
    srno: new FormControl(''),
    desc: new FormControl(''),
    manufacturer: new FormControl(''),
    qty: new FormControl(''),
    price: new FormControl(''),
    delivery: new FormControl(''),
    remark: new FormControl(''),
    sugvend: new FormControl(''),
  }); */
  indent:FormGroup=this.fb.group({
    $key: [''],
    dept:  [''],
    date:  [''],
    budget: ['', Validators.required],
    project: [''],
    srno:  [''],
    desc:  [''],
    manufacturer:  [''],
    qty:  [''],
    price:  [''],
    delivery:  [''],
    remark:  [''],
    sugvend:  [''],
  })

  indentArray=this.fb.array([]);
  modelArr:Indentmodel[]=[];
  
  addIndent(){
    console.log(this.indent.value);
    //this.indentArray.push(<FormGroup>this.indent.value);
    //this.indentArray[0]=this.indent.value;
    
    let q=this.indent.get('price').value;
    console.log(JSON.stringify(this.indent.get('date').value));
    let d=new DatePipe('en').transform(this.indent.get('date').value, 'MM/dd/yyyy');
    console.log(formatDate(this.indent.get('date').value, 'yyyy/mm/dd', 'en'));
    console.log(d);
    /* this.indent.patchValue({
      qty:q,
      delivery:d
    })*/
    console.log(this.indentArray.value);

    this.modelArr.push(this.indent.value);
    console.log("---------")
    console.log(this.modelArr);
    //this.indent.reset();
    this.initializeIndent();
    this.notify.successAdd('Added to the cart!!');

    this.indentlist=new MatTableDataSource(this.modelArr);
  }

  initializeIndent() {
    this.indent.patchValue({
      $key: null,
      srno: '',
      desc: '',
      qty: '',
      price: '',
      project: '',
      manufacturer: '',
      delivery: '',
      remark: '',
      sugvend:''
    });
  }

  update(){
    //console.log(this.indentArray[0].value);
    //this.indent=this.modelArr[0];
    this.indent.patchValue({
      $key: null,
      srno: this.modelArr[0].srno,
      desc: this.modelArr[0].desc,
      qty: this.modelArr[0].qty,
      price: this.modelArr[0].price,
      project: this.modelArr[0].project,
      manufacturer: this.modelArr[0].manufacturer,
      delivery: this.modelArr[0].delivery,
      remark: this.modelArr[0].remark,
      sugvend:this.modelArr[0].sugvend
    });
    
    console.log(this.modelArr[0]);
    
    
  }

  
  
}
