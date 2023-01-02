import FavoriteInitiator from '../src/scripts/utils/favorite-initiator'
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb'

const ID_TO_TEST = 'test123'
// eslint-disable-next-line no-undef
describe('Liking a restaurant', () => {
  const addFavoriteContainer = () => {
    document.body.innerHTML = '<div id="favorite-container"></div>'
  }

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    addFavoriteContainer()
  })

  // eslint-disable-next-line no-undef
  it('should show the add to favorites button when the restaurant has not been liked before', async () => {
    await FavoriteInitiator.init({
      favoriteButtonContainer: document.getElementById('favorite-container'),
      restaurant: {
        id: ID_TO_TEST
      }
    })

    // eslint-disable-next-line no-undef
    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy()
  })

  // eslint-disable-next-line no-undef
  it('should not show the remove from favorites button when the restaurant has not been liked before', async () => {
    await FavoriteInitiator.init({
      favoriteButtonContainer: document.getElementById('favorite-container'),
      restaurant: {
        id: ID_TO_TEST
      }
    })

    // eslint-disable-next-line no-undef
    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy()
  })

  // eslint-disable-next-line no-undef
  it('should be able add restaurant to favorites', async () => {
    await FavoriteInitiator.init({
      favoriteButtonContainer: document.getElementById('favorite-container'),
      restaurant: {
        id: ID_TO_TEST
      }
    })
    document.querySelector('[aria-label="like this restaurant"]').dispatchEvent(new Event('click'))
    const checkAfterFavoriteIdTest123 = await FavoriteRestaurantIdb.getRestaurant(ID_TO_TEST)
    // eslint-disable-next-line no-undef
    expect(checkAfterFavoriteIdTest123).toEqual({ id: ID_TO_TEST })
    await FavoriteRestaurantIdb.deleteRestaurant(ID_TO_TEST)
  })

  // eslint-disable-next-line no-undef
  it('should not be able to add restaurant to favorites if already favorited', async () => {
    await FavoriteInitiator.init({
      favoriteButtonContainer: document.getElementById('favorite-container'),
      restaurant: {
        id: ID_TO_TEST
      }
    })

    await FavoriteRestaurantIdb.putRestaurant({ id: ID_TO_TEST })
    document.querySelector('[aria-label="like this restaurant"]').dispatchEvent(new Event('click'))
    const checkAllFavoriteRestaurants = await FavoriteRestaurantIdb.getAllRestaurant()
    // eslint-disable-next-line no-undef
    expect(checkAllFavoriteRestaurants).toEqual([{ id: ID_TO_TEST }])
    await FavoriteRestaurantIdb.deleteRestaurant(ID_TO_TEST)
  })

  // eslint-disable-next-line no-undef
  it('should has no error when add has-no-id restaurant to favorites', async () => {
    await FavoriteInitiator.init({
      favoriteButtonContainer: document.getElementById('favorite-container'),
      restaurant: {}
    })
    document.querySelector('[aria-label="like this restaurant"]').dispatchEvent(new Event('click'))
    const checkAllRestaurants = await FavoriteRestaurantIdb.getAllRestaurant()
    // eslint-disable-next-line no-undef
    expect(checkAllRestaurants).toEqual([])
  })
})
