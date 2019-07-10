import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers, AnyAction, Reducer } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { homeReducer, HomeState } from 'routes/home/home-duck';
import { testReducer } from 'routes/test/duck';
import { GameState, gameReducer } from 'routes/games/routes/Game/game-duck';
import { User } from 'firebase';
import Game from 'models/game';
import reduceReducers from 'reduce-reducers';
import firestoreEnhancedReducers from './firestore-enhanced-reducer';
import {
  AddTasksState,
  addTasksReducer
} from 'routes/games/routes/Game/components/phases/setup/add-tasks/add-tasks-duck';
import {
  PlayersState,
  playerReducer
} from 'routes/games/routes/Game/components/phases/setup/players/players-duck';
import {
  ApplicationRouteState,
  applicationRouteReducer
} from 'routes/application/application-duck';

interface AppData {
  users: User[];
  currentGame: Game;
}
export interface FirestoreState {
  status: {
    requesting: AppData;
  };
  data: {};
}

export interface ApplicationState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  firebase: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  firestore: any;
  test: {
    greet: string;
  };
  routes: {
    application: ApplicationRouteState;
    home: HomeState;
    games: {
      game: {
        addTasks: AddTasksState;
        main: GameState;
        players: PlayersState;
      };
    };
  };
}

const combinedReducers = combineReducers<ApplicationState>({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  test: testReducer,
  routes: combineReducers({
    application: applicationRouteReducer,
    home: homeReducer,
    games: combineReducers({
      game: combineReducers({
        addTasks: addTasksReducer,
        main: gameReducer,
        players: playerReducer
      })
    })
  })
});

export default reduceReducers<ApplicationState>(
  combinedReducers,
  firestoreEnhancedReducers
) as Reducer<ApplicationState, AnyAction>;
