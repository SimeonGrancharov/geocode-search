import './App.css'
import { Search } from './components/Search'
import { Map } from './components/Map'
import { LocationContextProvider } from './components/LocationContextProvider'

function App() {
  return (
    <div className="root">
      <div className="main-container">
        <LocationContextProvider>
          <Search />
          <Map />
        </LocationContextProvider>
      </div>
    </div>
  )
}

export default App
