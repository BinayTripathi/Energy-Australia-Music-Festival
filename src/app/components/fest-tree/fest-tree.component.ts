import { Component, OnInit } from '@angular/core';
import { MusicFestService } from 'src/app/services/music-fest.service';
import { Observable } from 'rxjs';
import { Band } from 'src/app/model/band';
import { MusicFestival } from 'src/app/model/music-festival';
import { RecordLabel } from 'src/app/model/record-label';
import { MusicFestAdapter } from 'src/app/model/music-fest-adapter';

@Component({
  selector: 'app-fest-tree',
  templateUrl: './fest-tree.component.html',
  styleUrls: ['./fest-tree.component.css']
})
export class FestTreeComponent implements OnInit {

  constructor(private musicFestService:MusicFestService) { }

  ngOnInit() {
  }

  private loading: boolean = false;
  recordLabel : RecordLabel[] = [];
  adapter :MusicFestAdapter;
    
  arrangeDataForPresentation(festArr: MusicFestival[])
  {
    this.adapter = this.musicFestService.adapter;
    console.log(this.adapter.recordLabelMap)

    let lnArr:any[] = [];
    for (let key in this.adapter.recordLabelMap)
      lnArr.push(key);

    console.log(lnArr)

    let sortedNLArr = lnArr.sort();
    
    
    for(let rl of sortedNLArr)
    {
      let recordLabelObj = this.adapter.recordLabelMap[rl];
      console.log(recordLabelObj)
      let allBrandNamesInRL = recordLabelObj.allBandNames.sort();
      console.log(allBrandNamesInRL)

      let bandObjArr:Band[] = [];
      for(let brandName of allBrandNamesInRL)
      {
        if (brandName in this.adapter.bandMap)
        {
          let brandObjFromMap = this.adapter.bandMap[brandName];
          bandObjArr.push(brandObjFromMap);
        }
      }

      recordLabelObj.allBands = bandObjArr;
      this.recordLabel.push(recordLabelObj);      
    }
  }   
  

  getMusicfestivalDetails()
  {
    this.loading = true;
    this.musicFestService.getBandDetailsFromWS()
    .subscribe(res => this.arrangeDataForPresentation(res), err => console.error(err));
  }




}
