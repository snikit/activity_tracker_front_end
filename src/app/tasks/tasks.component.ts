import { Component, OnInit } from '@angular/core';
import { QueryRef, Apollo } from 'apollo-angular';
import { TASKS_API } from '../queries/task.queries';
import gql from 'graphql-tag';
import { NewTaskComponent } from './new-task/new-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  page = 1;
  tasks: any[] = [];
  polling = false;

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

  poll() {
    this.polling = !this.polling;

    this.polling ? this.query.startPolling(1000) : this.query.stopPolling();
  }

  update() {
    this.query.refetch({ offset: 10 * this.page });
  }

  toggle(taskId: number) {
    this.apollo
      .mutate({
        mutation: gql(TASKS_API.TOGGLE),
        variables: {
          taskId
        }
      })
      .subscribe();
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
