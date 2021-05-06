export default function ({ store, route, redirect }) {
  const user = store.state.users.user
  const isEmailVerified = store.state.users.emailVerification
  const blockedRoute = /\/forPhysicians\/*/g
  const homeRoute = '/'
  console.log('User: ' + !!user)
  console.log('EmailVerified: ' + isEmailVerified)
  if (!user && route.path.match(blockedRoute)) {
    redirect('/')
  }

  if (isEmailVerified && user && route.path === homeRoute) {
    redirect('/forPhysicians')
  }
}
