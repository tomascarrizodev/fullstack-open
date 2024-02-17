import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { LoggedUserContextProvider } from './components/loggedUserContext'
import { NotificationContextProvider } from './components/NotificationContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from './components/UsersContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <LoggedUserContextProvider>
        <UserContextProvider>
          <NotificationContextProvider>
            <App />
          </NotificationContextProvider>
        </UserContextProvider>
      </LoggedUserContextProvider>
    </Router>
  </QueryClientProvider>
)