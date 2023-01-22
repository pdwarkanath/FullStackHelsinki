import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const reviews = ['good', 'bad', 'ok']

  const dispatch = (review) => {
    store.dispatch({
      type: review.toUpperCase()
    })
  }

  
  const all = Object.values(store.getState()).reduce((acc, val) => acc + val, 0)
  const average = all === 0 ? 0 : (store.getState().good - store.getState().bad)/all
  const positive = all === 0 ? 0 :store.getState().good/all*100
  
  return (
    <div>
      {reviews.map((review, id) => <button key={id} onClick={()=>dispatch(review)}>{review}</button>)}
      {reviews.map((review, id) => <div key={id}>{review} {store.getState()[review]}</div>)}
      <div>all {all}</div>
      <div>average {average}</div>
      <div>positive {positive}%</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
