// eslint-disable-next-line no-undef
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/presenters/favorite-restaurant-search-presenter'
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb'

// eslint-disable-next-line no-undef
describe('Searching favorite restaurant', () => {
  let presenter
  const setSearchRestaurantInputAndContainer = () => {
    document.body.innerHTML = `
      <div>
        <input type="text" placeholder="Search and [ENTER]" id="search">
        <div id="deck"></div>
      </div>
    `
  }

  const searchKeyword = (keyword) => {
    const keywordInputElement = document.getElementById('search')
    keywordInputElement.value = keyword
    keywordInputElement.dispatchEvent(new Event('change'))
  }

  const constructPresenter = () => {
    // eslint-disable-next-line no-undef
    spyOn(FavoriteRestaurantIdb, 'getAllRestaurantByKeyword')
    presenter = new FavoriteRestaurantSearchPresenter({
      keywordInputElement: document.getElementById('search'),
      collectionContainerElement: document.getElementById('deck'),
      favoriteRestaurantModel: FavoriteRestaurantIdb
    })
  }

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    setSearchRestaurantInputAndContainer()
    constructPresenter()
  })

  // eslint-disable-next-line no-undef
  it('should be able to capture keyword that user typed', () => {
    searchKeyword('Kafe A')
    // eslint-disable-next-line no-undef
    expect(presenter.latestKeyword).toEqual('Kafe A')
  })

  // eslint-disable-next-line no-undef
  it('should ask model to search favorite restaurant by keyword', () => {
    searchKeyword('Kafe A')
    // eslint-disable-next-line no-undef
    expect(FavoriteRestaurantIdb.getAllRestaurantByKeyword)
      .toHaveBeenCalledWith('Kafe A')
  })
})
