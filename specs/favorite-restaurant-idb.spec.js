// eslint-disable-next-line no-undef
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb'
import { itActsAsFavoriteRestaurantModel } from './contracts/favorite-restaurant-contract'

// eslint-disable-next-line no-undef
describe('Favorite Restaurant Idb Contract Implementation Test', () => {
  // eslint-disable-next-line no-undef
  afterEach(async () => {
    for (const restaurant of (await FavoriteRestaurantIdb.getAllRestaurant())) {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id)
    }
  })

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb)
})
