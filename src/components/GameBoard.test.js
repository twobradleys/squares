/* eslint-env jest */

import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import GameBoard from './GameBoard'

it('renders without crashing', () =>{
  const game = Immutable.Map({})
  const fetchCellsForGame = () => {}

  const gameBoard = GameBoard({game, fetchCellsForGame})
  const div = document.createElement('div')
  // TODO
  //ReactDOM.render(gameBoard, div)
  //expect(rendered).not.toBeNull()
})
