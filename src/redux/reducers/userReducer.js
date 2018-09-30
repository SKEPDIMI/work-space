let defaultUser = {
  username: 'anon',
  email: 'me@email.com',
  verified: null,
  bio: '',
  posts: [],
  following: [],
  followers: [],
  authenticated: false,
  loading: true
}

export default (state = defaultUser, action) => {
  switch(action.type){
    case 'SET_USER':
      return {
        ...action.payload,
        loading: false,
        authenticated: true
      }
    case 'SET_USER_DEFAULT':
      console.log('set default')
      return {
        ...defaultUser,
        loading: false
      }
    default:
      return state
  }
}
