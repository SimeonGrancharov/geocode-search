import './App.css'
import { SearchInput } from './components/SearchInput'
import { SearchContextProvider } from './components/SearchProvider'
import { SearchResults } from './components/SearchResults'

function App() {
  return (
    <div className="root">
      <SearchContextProvider>
        <SearchInput />
        <SearchResults />
      </SearchContextProvider>
    </div>
  )
}

export default App
