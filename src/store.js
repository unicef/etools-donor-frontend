import { configureStore } from 'redux-starter-kit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
const sagas = createSagaMiddleware();

const store = configureStore({ reducer: rootReducer, middleware: [sagas] });
sagas.run(rootSaga);

export default store;
