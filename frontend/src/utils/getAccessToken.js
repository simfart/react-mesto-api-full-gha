export const getAccessToken = () => {
  return window.localStorage.getItem('jwt')
}
