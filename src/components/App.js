import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

import AddPlayer from '../containers/AddPlayer'
import EnrolledPlayerList from '../containers/EnrolledPlayerList'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />

    <AddPlayer />
    <EnrolledPlayerList />
  </div>
)

export default App
