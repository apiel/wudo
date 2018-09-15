import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const query = gql`
  {
    getTags {
      name
      creationDate
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';

  data: Observable<any>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.data = this.apollo
      .watchQuery({query})
      .valueChanges.pipe(map(({data}) => {
        return (<any>data).getTags;
      }));
  }

  ngOnDestroy() {
  }

  log(...args) { console.log(...args); }
}
