import { AppAction } from 'config/redux';
import { AppActionCreator } from 'store';
import { ApplicationState } from 'store/root-reducer';
import Task from 'models/task';
import { selectGameId } from 'routes/games/routes/Game/game-duck';
import { selectCurrentUserId } from 'application/selectors';
import { timestamp } from 'utils/firestore';

enum AddTasksActionTypes {
  NewTaskTextChanged = 'GAMES/GAME/ADD_TASK/NEW_TASK_TEXT_CHANGED',
  AddTaskRequested = 'GAMES/GAME/ADD_TASK/ADD_TASK_REQUESTED',
  AddTaskSucceeded = 'GAMES/GAME/ADD_TASK/ADD_TASK_SUCCEEDED',
  RemoveTaskRequested = 'GAMES/GAME/ADD_TASK/REMOVE_TASK_REQUESTED',
  RemoveTaskSucceeded = 'GAMES/GAME/ADD_TASK/REMOVE_TASK_SUCCEEDED'
}

// Selectors

export const selectNewTaskText = (state: ApplicationState) =>
  state.routes.games.game.addTasks.newTaskText;

// Actions

export const newTaskTextChanged: AppActionCreator = (
  newTaskText: string
) => dispatch =>
  dispatch({
    type: AddTasksActionTypes.NewTaskTextChanged,
    payload: {
      newTaskText
    }
  });

export const addTask: AppActionCreator = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let firestore = getFirestore();
  let state = getState();

  let gameId = selectGameId(state);
  let name = selectNewTaskText(state);
  if (!name) {
    // Todo show error message
    return;
  }

  let task: Task = {
    name,
    createdBy: selectCurrentUserId(state),
    createdAt: timestamp(firestore)
  };

  dispatch({ type: AddTasksActionTypes.AddTaskRequested, payload: task });

  await firestore.add(
    {
      collection: 'games',
      doc: gameId,
      subcollections: [{ collection: 'tasks' }]
    },
    task
  );

  dispatch({ type: AddTasksActionTypes.AddTaskSucceeded });
};

export const removeTask: AppActionCreator = (taskId: string) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  let firestore = getFirestore();
  let state = getState();

  let gameId = selectGameId(state);

  dispatch({ type: AddTasksActionTypes.RemoveTaskRequested, payload: taskId });

  await firestore.delete({
    collection: 'games',
    doc: gameId,
    subcollections: [{ collection: 'tasks', doc: taskId }]
  });

  dispatch({ type: AddTasksActionTypes.RemoveTaskSucceeded });
};

// Reducer

type Actions =
  | AppAction<AddTasksActionTypes.NewTaskTextChanged, { newTaskText: string }>
  | AppAction<AddTasksActionTypes.AddTaskRequested>;

export interface AddTasksState {
  newTaskText: string;
}

const initialState: AddTasksState = {
  newTaskText: ''
};

export const addTasksReducer = (
  state: AddTasksState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case AddTasksActionTypes.NewTaskTextChanged:
      return { ...state, newTaskText: action.payload.newTaskText };
    case AddTasksActionTypes.AddTaskRequested:
      return { ...state, newTaskText: '' };
    default:
      return state;
  }
};
