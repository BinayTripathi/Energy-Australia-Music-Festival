/*import { TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';*/

import { MusicFestService } from './music-fest.service';
//import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";

describe('MusicFestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusicFestService = TestBed.get(MusicFestService);
    expect(service).toBeTruthy();
  });
});


/*describe('MusicFestService: getBandDetailsFromWS', () =>
{
  let service: MusicFestService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        MusicFestService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  }


}*/

describe('MusicFestService: getBandDetailsFromWS', () => {
  let service: MusicFestService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [MusicFestService]
    });
    
    service = TestBed.get(MusicFestService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
      httpTestingController.verify();
  });

  it(
    "search should return SearchItems",
    fakeAsync(() => {
        let response = [
          {
            "name": "Omega Festival",
            "bands": [
              {
                "name": "Band X",
                "recordLabel": "Record Label 1"
              }
            ]
          },
          {
            "name": null,
            "bands": [
              {
                "name": "Band Y",
                "recordLabel": "Record Label 1"
              }
            ]
          },
          {
            "name": "Alpha Festival",
            "bands": [
              {
                "name": "Band A",
                "recordLabel": "Record Label 2"
              }
            ]
          },
          {
            "name": "Beta  Festival",
            "bands": [
              {
                "name": "Band A",
                "recordLabel": "Record Label 2"
              }
            ]
          }
        ];

        // Perform a request (this is fakeAsync to the responce won't be called until tick() is called)
        service.getBandDetailsFromWS();

        // Expect a call to this URL
        const req = httpTestingController.expectOne(
            "http://localhost:8000/ems/api/v1/festivals"
        );
        
        expect(req.request.method).toEqual("GET");
        req.flush(response);

        tick();

        // Run our tests
        expect(service.adapter.recordLabelMap["Record Label 1"].name).toBe("Record Label 1");
        expect(service.adapter.bandMap["Band A"]).toBe("Band A");
    })
);
});