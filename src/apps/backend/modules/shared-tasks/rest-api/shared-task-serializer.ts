import { SerialiseSharedTask, SharedTask } from "../types";


export const serializeTaskAsJSON = (sharedTask: SharedTask): SerialiseSharedTask => ({
 task:sharedTask.task,
 account:sharedTask.account
});
