export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://home-constructor-api.herokuapp.com'
    : 'http://localhost:8080';