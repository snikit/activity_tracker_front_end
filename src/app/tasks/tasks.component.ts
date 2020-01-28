import { Component, OnInit } from '@angular/core';
import { QueryRef, Apollo } from 'apollo-angular';
import { TASKS_API } from '../queries/task.queries';
import gql from 'graphql-tag';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  page = 1;
  tasks: any[] = [];

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: gql(TASKS_API.GET),
      variables: { offset: 10 * this.page }
    });

    this.query.valueChanges.subscribe(result => {
      this.tasks = result.data && result.data.tasks;
    });
  }

  update() {
    this.apollo
      .mutate({
        mutation: gql(TASKS_API.COMPLETE),
        variables: {
          taskId: 1
        }
      })
      .subscribe();
    // this.query.refetch({ offset: 10 * this.page });
  }

  nextPage() {
    this.page++;
    this.update();
  }

  prevPage() {
    if (this.page > 0) this.page--;
    this.update();
  }
}
