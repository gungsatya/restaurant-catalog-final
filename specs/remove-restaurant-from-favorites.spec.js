import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb'
import * as TestFactories from './helpers/test-factories'

const ID_TO_TEST = 'test321'

describe('Removing a restaurant from favorites', () => {
  const addFavoriteContainer = () => {
    document.body.innerHTML = '<div id="favorite-button-container"></div>'
  }

  beforeEach(async () => {
    addFavoriteContainer()
    await FavoriteRestaurantIdb.putRestaurant({ id: ID_TO_TEST })
  })

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(ID_TO_TEST)
  })

  it('should not show the add to favorites button when the restaurant has been added before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({
      id: ID_TO_TEST
    })

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy()
  })

  it('should show the remove from favorites button when the restaurant has been added before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({
      id: ID_TO_TEST
    })

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy()
  })

  it('should be able remove restaurant to favorites', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({
      id: ID_TO_TEST
    })
    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'))
    const checkAllFavorites = await FavoriteRestaurantIdb.getAllRestaurant()

    expect(checkAllFavorites).toEqual([])
  })

  it('should has no error if user click remove favorites on un register id', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({
      id: ID_TO_TEST
    })

    await FavoriteRestaurantIdb.deleteRestaurant(ID_TO_TEST)

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'))
    const checkAllFavoriteRestaurants = await FavoriteRestaurantIdb.getAllRestaurant()

    expect(checkAllFavoriteRestaurants).toEqual([])
  })
})
