/**
 * Created by luthfi on 12/20/16.
 */

import { applyMiddleware, createStore } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import api from './middleware/api'

import reducer from "./reducers"

const middleware = applyMiddleware(promise(), thunk, logger())

export default createStore(reducer, middleware)
