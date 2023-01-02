import Detail from '../views/pages/detail'
import Favorites from '../views/pages/favorites'
import Home from '../views/pages/home'
import Page404 from '../views/pages/page404'

const routes = {
  '/': Home, // default page
  '/favorites': Favorites,
  '/detail/:id': Detail,
  '/404': Page404
}

export default routes
