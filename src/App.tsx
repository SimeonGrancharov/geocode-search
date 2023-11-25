import './App.css'
import { Search } from './components/Search'
import { SearchContextProvider } from './components/SearchProvider'

function App() {
  return (
    <div className="root">
      <SearchContextProvider>
        <div className="main-container">
          <Search />
        </div>
      </SearchContextProvider>
    </div>
  )
}

export default App
