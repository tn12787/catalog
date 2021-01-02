// TODO: Move this out of edit path? 
export interface ArtworkData {
  assignee: string;
  dueDate: string;
  // Have to mark status explicitly because we could 
  // pass the due date and its very likely that things wont be done
  // by then so we cant auto update. 
  // TODO: Make a type? We have one somewhere else
  status: string;
}
