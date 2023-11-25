import React from 'react'
import { SearchContextT } from '../types/SearchContext'

export const SearchContext = React.createContext<SearchContextT | null>(null)
