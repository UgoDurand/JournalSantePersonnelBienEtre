// Configuration de l'API
export const API_CONFIG = {
  BASE_URL: process.env.VUE_APP_API_URL || 'http://localhost:8080',
  ENDPOINTS: {
    AUTH: {
      MICROSOFT_LOGIN: '/oauth2/authorize/microsoft',
      USER_INFO: '/auth/user',
      VALIDATE: '/auth/validate',
      LOGOUT: '/auth/logout',
      INFO: '/auth/info'
    }
  },
  STORAGE_KEYS: {
    TOKEN: 'auth_token',
    USER: 'auth_user'
  }
}

export default API_CONFIG 