import {
  QueryClient,
  QueryClientProvider as LQueryClientProvider,
  QueryCache,
} from 'react-query'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({}),
})

export const QueryClientProvider = ({ children }) => {
  return <LQueryClientProvider client={client}>{children}</LQueryClientProvider>
}
