import FavoriteRestaurantSearchPresenter from '../src/scripts/views/presenters/favorite-restaurant-search-presenter'
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb'

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
    spyOn(FavoriteRestaurantIdb, 'getAllRestaurantByKeyword')
    presenter = FavoriteRestaurantSearchPresenter.init({
      keywordInputElement: document.getElementById('search'),
      collectionContainerElement: document.getElementById('deck'),
      favoriteRestaurantModel: FavoriteRestaurantIdb
    })
  }

  beforeEach(() => {
    setSearchRestaurantInputAndContainer()
    constructPresenter()
  })

  it('should be able to capture keyword that user typed', () => {
    searchKeyword('Kafe A')

    expect(presenter.latestKeyword).toEqual('Kafe A')
  })

  it('should ask model to search favorite restaurant by keyword', () => {
    searchKeyword('Kafe A')

    expect(FavoriteRestaurantIdb.getAllRestaurantByKeyword)
      .toHaveBeenCalledWith('Kafe A')
  })
})
