import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb'
import { itActsAsFavoriteRestaurantModel } from './contracts/favorite-restaurant-contract'

describe('Favorite Restaurant Idb Contract Implementation Test', () => {
  afterEach(async () => {
    for (const restaurant of (await FavoriteRestaurantIdb.getAllRestaurant())) {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id)
    }
  })

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb)
})
