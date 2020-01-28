export const TASKS_API = {
  GET: `{
     tasks{
        id
        title
        completed
        status
    }
  }`,
  COMPLETE: `mutation markAsCompleted($taskId : Float!){
          markAsCompleted(taskId : $taskId){
            id
          }
        }`,
  TOGGLE: `mutation toggle($taskId : Float!){
          toggle(taskId : $taskId){
            id
          }
        }`
};
