import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

// import { useDispatch } from 'redux-react-hook';

export default function addText(): ThunkAction<{}, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
    dispatch({
      type: 'ADD_TEXT',
      payload: 'Hooky booiiiiadad cool it works',
    });
}
