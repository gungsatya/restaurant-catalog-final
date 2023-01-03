import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb'
import * as TestFactories from './helpers/test-factories'

const ID_TO_TEST = 'test123'
describe('Adding a restaurant to favorites', () => {
  const addFavoriteContainer = () => {
    document.body.innerHTML = '<div id="favorite-button-container"></div>'
  }

  beforeEach(() => {
    addFavoriteContainer()
  })

  it('should show the add to favorites button when the restaurant has not been added before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({
      id: ID_TO_TEST
    })

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy()
  })

  it('should not show the remove from favorites button when the restaurant has not been added before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({
      id: ID_TO_TEST
    })

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy()
  })

  it('should be able add restaurant to favorites', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({
      id: ID_TO_TEST
    })
    document.querySelector('[aria-label="like this restaurant"]').dispatchEvent(new Event('click'))
    const checkAfterFavoriteIdTest123 = await FavoriteRestaurantIdb.getRestaurant(ID_TO_TEST)

    expect(checkAfterFavoriteIdTest123).toEqual({ id: ID_TO_TEST })
    await FavoriteRestaurantIdb.deleteRestaurant(ID_TO_TEST)
  })

  it('should not be able to add restaurant to favorites if already added', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({
      id: ID_TO_TEST
    })

    await FavoriteRestaurantIdb.putRestaurant({ id: ID_TO_TEST })
    document.querySelector('[aria-label="like this restaurant"]').dispatchEvent(new Event('click'))
    const checkAllFavoriteRestaurants = await FavoriteRestaurantIdb.getAllRestaurant()

    expect(checkAllFavoriteRestaurants).toEqual([{ id: ID_TO_TEST }])
    await FavoriteRestaurantIdb.deleteRestaurant(ID_TO_TEST)
  })

  it('should has no error when add has-no-id restaurant to favorites', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({})
    document.querySelector('[aria-label="like this restaurant"]').dispatchEvent(new Event('click'))
    const checkAllRestaurants = await FavoriteRestaurantIdb.getAllRestaurant()

    expect(checkAllRestaurants).toEqual([])
  })
})
