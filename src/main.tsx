import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import App from './App'
import './global.less'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter basename="">
      <App />
    </BrowserRouter>
  </Provider>
)
