import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb'
import FavoriteRestaurantSearchPresenter from '../presenters/favorite-restaurant-search-presenter'

const Favorites = {
  async render() {
    return `
    <section id="restaurants">
      <div class="container">
        <h2 class="title">Your Favorite Restaurant</h2>
        <input type="text" placeholder="Search and [ENTER]" id="search-favorite">
        <div class="card-deck" id="restaurant-deck"></div>
      </div>
    </section>`
  },

  async afterRender() {
    FavoriteRestaurantSearchPresenter.init({
      keywordInputElement: document.getElementById('search-favorite'),
      collectionContainerElement: document.getElementById('restaurant-deck'),
      favoriteRestaurantModel: FavoriteRestaurantIdb
    })
  }
}

export default Favorites
