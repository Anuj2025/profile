import React from 'react'
import Model from './components/Model/main'
import Navbar from './components/common/Navbar'
import Panel from './components/panels/panel1'
import Hero from './components/common/Hero'

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Model />
      <Panel /> 
    </div>
  )
}

export default App