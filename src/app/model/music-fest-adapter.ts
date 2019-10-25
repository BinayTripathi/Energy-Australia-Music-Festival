import { RecordLabel } from './record-label';
import { Band } from './band';
import { MusicFestival } from './music-festival';

export class MusicFestAdapter {

    //recordLabelMap:Map<String,RecordLabel> = new Map<String,RecordLabel>();
    //bandMap:Map<String,Band> = new Map<String,Band>();       
    
    recordLabelMap = new Object();
    bandMap = new Object();

    reset()
    {
        this.recordLabelMap = new Object()
        this.bandMap = new Object()
    }
     
    adapt(fest:any):Boolean
    {
        let festivalName = fest.name;
        let bands = fest.bands; 
        
        
        for(var band of bands)
        {
            let bandName = band.name;
            let recordLabel = band.recordLabel;

            //console.log(festivalName + "~" + bandName +"~" + recordLabel)

            let currBand:Band;
            let currRecordLabel:RecordLabel;
            let festArr:String[] = [];

            if(bandName in this.bandMap )
            {
                currBand = this.bandMap[bandName];
                festArr = currBand.festivalArr;
            }
            else
                currBand = new Band(bandName ,festArr);

            festArr.push(festivalName)            
            this.bandMap[bandName]= currBand;  

            let allBandsNamesInLable:String[] = [];
            if( recordLabel in this.recordLabelMap)
            {
                currRecordLabel = this.recordLabelMap[recordLabel];
                allBandsNamesInLable = currRecordLabel.allBandNames;
            }
            else
                currRecordLabel = new RecordLabel(recordLabel ,allBandsNamesInLable ,[]);

            let brandNameAlReadyPresent = false;
            for(let availableBandName of allBandsNamesInLable)
            {
                if( availableBandName == bandName)
                    brandNameAlReadyPresent = true;
            }
            
            if(brandNameAlReadyPresent == false)
                allBandsNamesInLable.push(bandName);
            this.recordLabelMap[recordLabel] = currRecordLabel;                       
        }
        return true;
        //return new MusicFestival(festivalName,bandArr)
    }
}
