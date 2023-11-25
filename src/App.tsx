import './App.css'
import { Search } from './components/Search'
import { Map } from './components/Map'
import { LocationContextProvider } from './components/LocationContextProvider'

function App() {
  return (
    <div className="root">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      />
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
