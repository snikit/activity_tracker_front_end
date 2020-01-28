export const TASKS_API = {
  GET: `{
     tasks{
        id
        title
        completed
    }
  }`,
  COMPLETE: `mutation markAsCompleted($taskId : Float!){
          markAsCompleted(taskId : $taskId){
            title
          }
        }`
};
