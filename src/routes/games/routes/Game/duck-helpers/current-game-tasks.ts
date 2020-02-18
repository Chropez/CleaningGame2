import { ApplicationState } from 'store/root-reducer';
import { createSelector } from 'reselect';
import TasksViewModel from '../view-models/tasks-view-model';
import GamePlayer from 'models/game-player';

// Query
export const getGameTasksQuery = (gameId: string) => ({
  collection: 'games',
  doc: gameId,
  subcollections: [{ collection: 'tasks', orderBy: [['createdAt', 'desc']] }],
  storeAs: 'currentGameTasks'
});

// Selectors

const selectCurrentGameTasks = (state: ApplicationState) =>
  state.firestore.data.currentGameTasks;

const selectOrderedCurrentGameTasks = (state: ApplicationState) =>
  state.firestore.ordered.currentGameTasks;

const selectAllPlayersTaskEstimations = (state: ApplicationState) =>
  state.firestore.ordered.allPlayersTaskEstimations;

export const selectTasksViewModel = (
  selectGamePlayersData: (
    state: ApplicationState
  ) => Record<string, GamePlayer | undefined> | undefined
) =>
  createSelector(
    [
      selectCurrentGameTasks,
      selectAllPlayersTaskEstimations,
      selectOrderedCurrentGameTasks,
      selectGamePlayersData
    ],
    (gameTasks, allPlayersTaskEstimations, orderedTasks, gamePlayersData) => {
      if (
        gameTasks === undefined ||
        allPlayersTaskEstimations === undefined ||
        gamePlayersData === undefined
      ) {
        return [];
      }

      let tasks: Record<string, TasksViewModel | undefined> = JSON.parse(
        JSON.stringify(gameTasks)
      );

      allPlayersTaskEstimations.forEach(taskEstimation => {
        let task = tasks[taskEstimation.taskId!]!;
        if (task === undefined) {
          return;
        }

        if (task.estimations) {
          task.estimations.push(taskEstimation);
          return;
        }

        if (task.assigneePlayerId) {
          task.assignee = gamePlayersData[task.assigneePlayerId];
        }

        task.estimations = [taskEstimation];
      });

      return orderedTasks
        .filter(orderedTask => tasks[orderedTask.id!] !== undefined)
        .map(orderedTask => {
          let taskVM = tasks[orderedTask.id!] as TasksViewModel;

          taskVM.id = orderedTask.id!;
          if (taskVM.estimations === undefined) {
            taskVM.averageEstimate = 0;
            return taskVM;
          }

          let sum = taskVM.estimations.reduce(
            (accumulator, task) => accumulator + task.estimate,
            0
          );

          taskVM.averageEstimate =
            sum > 0 ? sum / taskVM.estimations.length : 0;

          return taskVM;
        });
    }
  );
