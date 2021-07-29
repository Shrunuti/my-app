import { Component } from '@angular/core';
import {AppService} from './app.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app1';
  year_buttons:any=[];
  defaultResponse:any =[];
  mission_name:any="";
  flight_number:any="";
  mission_ids:any=[];
  launch_year:any;
  launch_success:any;
  launch_landing:any;
  dataBackup:any;
  filterYear:any;
  filterLaunch:any;
  filterLand:any;
  isDataEmpty:any;
  constructor(private appservice:AppService, private http:HttpClient){}
  
  ngOnInit(){
      console.log("welcom to app");
      for(let i=6;i<=20;i++){
        if(i<10){
          this.year_buttons.push("200"+i);
        }
        else{
          this.year_buttons.push("20"+i);
        }
      }
      this.http.get<any>('https://api.spaceXdata.com/v3/launches?limit=100').subscribe(data => {
        this.defaultResponse = data;
        this.dataBackup = data;
      });
  }
  filterByYear(year:any){
    this.filterYear = year;
    if(this.filterLaunch==undefined || this.filterLaunch==null || this.filterLand==undefined ||  this.filterLand==null ||  this.filterLand=="")    
      this.defaultResponse = this.dataBackup.filter((x:any)=>{ return x.launch_year==parseInt(year)});
    else{
      this.filterCombine();
    }
  }
  filterByLaunch(data:any){
    this.filterLaunch = data;
    if(this.filterLand==undefined ||  this.filterLand==null ||  this.filterLand=="")    
      this.defaultResponse = this.dataBackup.filter((x:any)=>{ return x.launch_success==data});
    else{
      this.filterCombine();
    }
  }
  filterByLand(data:any){
    this.filterLand = data;
    if(this.filterLaunch==undefined ||  this.filterLaunch==null ||  this.filterLaunch=="")    
      this.defaultResponse = this.dataBackup.filter((x:any)=>{ return x.rocket.first_stage.cores[0].land_success==data});
    else{
      this.filterCombine();
    }
  }
  filterCombine(){
    let url="";
    // if(this.filterYear!=null && this.filterYear!=undefined){
    //   url = "https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year="+parseInt(this.filterYear);
    //   this.getData(url);
    // }
    if(this.filterLaunch!=null && this.filterLand!=null){
      url = "https://api.spaceXdata.com/v3/launches?limit=100&launch_success="+this.filterLaunch+"&land_success="+this.filterLand+"";
      this.getData(url);
    }
    if(this.filterLand !=null && this.filterLand !=undefined && this.filterLaunch !=null && this.filterLaunch !=undefined && this.filterYear!=null && this.filterYear!=undefined){
      url = "https://api.spacexdata.com/v3/launches?limit=100&launch_success="+this.filterLaunch+"&land_success="+this.filterLand+"&launch_year="+parseInt(this.filterYear)+"";
      this.getData(url);
    }
  }
  getData(url:any){
    this.http.get<any>(url).subscribe(data => {
      this.defaultResponse = data;
      if(this.defaultResponse.length==0){
        this.isDataEmpty = true;
      }
      else{
        this.isDataEmpty = false;
      }
    });
  }
  
}
