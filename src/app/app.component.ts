import { Component,OnInit } from '@angular/core';
import {AppService} from './app.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Github search repo';
  
  defaultResponse:any =[];
  username:any;
  dataBackup:any;
  url:any;
  isDataEmpty:any;
  srch_repo:any="";
  srch_owner:any="";
  srch_star:any;
  srch_issuecount:any;
  srch_watch:any;

  constructor(private appservice:AppService, private http:HttpClient){}
  
  ngOnInit(){
      console.log("welcom to app");
     ///users/{username}/repos
      
  }
  Submit(){
    this.srch_issuecount="";
    this.srch_owner="";
    this.srch_repo;
    this.srch_star;
    this.srch_watch;
    this.url = "https://api.github.com/users/"+this.username+"/repos";
    this.http.get<any>(this.url).subscribe(data => {
        this.defaultResponse = data;
        this.dataBackup = data;
      });
  }
  SearchBy(){
    
    this.defaultResponse=[];
    this.defaultResponse = this.dataBackup.filter((obj:any) => this.srch_repo !="" ? obj.name.toLowerCase() == this.srch_repo.toLowerCase() :null 
    && this.srch_owner!="" ? obj.owner.login.toLowerCase() == this.srch_owner.toLowerCase() :null)
    if(this.srch_issuecount!=null){
      this.defaultResponse = this.dataBackup.filter((x:any)=>x.open_issues_count == this.srch_issuecount)
    }
    if(this.srch_watch!=null){
      this.defaultResponse = this.dataBackup.filter((x:any)=>x.watchers_count == this.srch_watch)
    }
    if(this.srch_star!=null){
      this.defaultResponse = this.dataBackup.filter((x:any)=>x.stargazers_count == this.srch_star)
    }
  }
  ClearSearch(){
    this.srch_issuecount;
    this.srch_owner="";
    this.srch_repo="";
    this.srch_star;
    this.srch_watch;
    this.Submit();
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
