import {
  configureStore
} from 'redux-starter-kit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './slices';
import rootSaga from './sagas';
const sagas = createSagaMiddleware();

const middleware = [sagas];
// if (process.env.NODE_ENV === `development`) {
//   const { logger } = require(`redux-logger`);

//   middleware.push(logger);
// }

const store = configureStore({
  reducer: rootReducer,
  middleware
});
sagas.run(rootSaga);

export default store;
