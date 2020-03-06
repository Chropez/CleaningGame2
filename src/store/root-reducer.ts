import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers, AnyAction, Reducer } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { homeReducer, HomeState } from 'routes/home/home-duck';
import { testReducer } from 'routes/test/duck';
import { GameState, gameReducer } from 'routes/games/routes/Game/game-duck';
import Game from 'models/game';
import reduceReducers from 'reduce-reducers';
import firestoreEnhancedReducers from './firestore-enhanced-reducer';
import {
  AddTasksState,
  addTasksReducer
} from 'routes/games/routes/Game/phases/setup/add-tasks/add-tasks-duck';
import {
  PlayersState,
  playerReducer
} from 'routes/games/routes/Game/phases/setup/players/players-duck';
import {
  ApplicationRouteState,
  applicationRouteReducer
} from 'routes/application/application-duck';
import {
  setupPhaseReducer,
  SetupPhaseState
} from 'routes/games/routes/Game/phases/setup/setup-phase-duck';
import GamePlayer from 'models/game-player';
import Task from 'models/task';
import TaskEstimation from 'models/task-estimation';
import User from 'models/user';
import {
  InvitationState,
  invitationReducer
} from 'routes/games/routes/invitation/invitation-duck';

type Collection<T> = T;

interface AppData {
  users: Collection<User>;
  games: Collection<Game>;
  currentGame: Game;
  currentGamePlayers: Collection<GamePlayer>;
  currentGameTasks: Collection<Task>;
  allPlayersTaskEstimations: Collection<TaskEstimation>;
  currentPlayerTaskEstimations: Collection<TaskEstimation>;
  currentGameAvailablePlayers: Collection<User>;
  invitationGame: Game;
}

type FirestoreRecordData<T> = {
  [K in keyof T]: T[K] extends Collection<T[K]>
    ? Record<string, T[K] | undefined> | undefined
    : T[K] | undefined;
};
type FirestoreOrderedData<T> = { [K in keyof T]: T[K][] };

export interface FirestoreState {
  status: {
    requesting: AppData | undefined;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: FirestoreRecordData<AppData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ordered: FirestoreOrderedData<AppData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listeners: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queries: any;
}

export interface ApplicationState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  firebase: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  firestore: FirestoreState;
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
        setupPhase: SetupPhaseState;
      };
      invitation: InvitationState;
    };
  };
}

let fireStoreInitialState: FirestoreState = {
  status: {
    requesting: undefined
  },
  data: {
    users: undefined,
    games: undefined,
    currentGame: undefined,
    currentGamePlayers: undefined,
    currentGameTasks: undefined,
    allPlayersTaskEstimations: undefined,
    currentPlayerTaskEstimations: undefined,
    currentGameAvailablePlayers: undefined,
    invitationGame: undefined
  },
  ordered: {
    users: [],
    games: [],
    currentGame: [],
    currentGamePlayers: [],
    currentGameTasks: [],
    allPlayersTaskEstimations: [],
    currentPlayerTaskEstimations: [],
    currentGameAvailablePlayers: [],
    invitationGame: []
  },
  listeners: {},
  errors: {},
  queries: {}
};

const combinedReducers = combineReducers<ApplicationState>({
  firebase: firebaseReducer,
  firestore: (state = fireStoreInitialState, action) =>
    firestoreReducer(state, action),
  test: testReducer,
  routes: combineReducers({
    application: applicationRouteReducer,
    home: homeReducer,
    games: combineReducers({
      game: combineReducers({
        addTasks: addTasksReducer,
        main: gameReducer,
        players: playerReducer,
        setupPhase: setupPhaseReducer
      }),
      invitation: invitationReducer
    })
  })
});

export default reduceReducers<ApplicationState>(
  combinedReducers,
  firestoreEnhancedReducers
) as Reducer<ApplicationState, AnyAction>;
