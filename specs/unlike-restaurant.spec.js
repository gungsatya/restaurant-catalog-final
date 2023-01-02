import FavoriteInitiator from '../src/scripts/utils/favorite-initiator'
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb'

const ID_TO_TEST = 'test321'
// eslint-disable-next-line no-undef
describe('Unliking a restaurant', () => {
  const addFavoriteContainer = () => {
    document.body.innerHTML = '<div id="favorite-container"></div>'
  }

  // eslint-disable-next-line no-undef
  beforeEach(async () => {
    addFavoriteContainer()
    await FavoriteRestaurantIdb.putRestaurant({ id: ID_TO_TEST })
  })

  // eslint-disable-next-line no-undef
  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(ID_TO_TEST)
  })

  // eslint-disable-next-line no-undef
  it('should not show the add to favorites button when the restaurant has been liked before', async () => {
    await FavoriteInitiator.init({
      favoriteButtonContainer: document.getElementById('favorite-container'),
      restaurant: {
        id: ID_TO_TEST
      }
    })

    // eslint-disable-next-line no-undef
    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy()
  })

  // eslint-disable-next-line no-undef
  it('should show the remove from favorites button when the restaurant has been liked before', async () => {
    await FavoriteInitiator.init({
      favoriteButtonContainer: document.getElementById('favorite-container'),
      restaurant: {
        id: ID_TO_TEST
      }
    })

    // eslint-disable-next-line no-undef
    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy()
  })

  // eslint-disable-next-line no-undef
  it('should be able remove restaurant to favorites', async () => {
    await FavoriteInitiator.init({
      favoriteButtonContainer: document.getElementById('favorite-container'),
      restaurant: {
        id: ID_TO_TEST
      }
    })
    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'))
    const checkAllFavorites = await FavoriteRestaurantIdb.getAllRestaurant()
    // eslint-disable-next-line no-undef
    expect(checkAllFavorites).toEqual([])
  })

  // eslint-disable-next-line no-undef
  it('should has no error if user click remove favorites on un register id', async () => {
    await FavoriteInitiator.init({
      favoriteButtonContainer: document.getElementById('favorite-container'),
      restaurant: {
        id: ID_TO_TEST
      }
    })

    await FavoriteRestaurantIdb.deleteRestaurant(ID_TO_TEST)

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'))
    const checkAllFavoriteRestaurants = await FavoriteRestaurantIdb.getAllRestaurant()
    // eslint-disable-next-line no-undef
    expect(checkAllFavoriteRestaurants).toEqual([])
  })
})
