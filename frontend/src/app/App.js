import { Route, Routes } from 'react-router-dom'
import Register from '../component/Register'
import Login from '../component/Login'
import Footer from '../component/Footer'
import ProtectedRoute from '../component/ProtectedRoute'
import Main from '../component/Main'
import { Popups } from '../component/Popups'
import { QueryClientProvider } from './providers'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'

export const App = () => {
  return (
    <QueryClientProvider>
      <ReactQueryDevtools initialIsOpen={true} />
      <BrowserRouter>
        <Popups>
          <div className="body">
            <div className="page">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute
                      element={
                        <>
                          <Main />
                          <Footer />
                        </>
                      }
                    />
                  }
                />
                <Route path="/singup" element={<Register />} />
                <Route path="/singin" element={<Login />} />
              </Routes>
            </div>
          </div>
        </Popups>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
