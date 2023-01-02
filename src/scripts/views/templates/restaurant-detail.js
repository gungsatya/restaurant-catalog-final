import { IMAGE_SIZE } from '../../global/config'
import API_ENDPOINT from './../../global/api-endpoint'

const createAddToFavoritesButtonTemplate = () => `
  <button aria-label="like this restaurant" id="add-favorite" class="favorite">
     <i class="fa fa-heart-o" aria-hidden="true"></i> Add to Favorites
  </button>
`

const createRemoveFromFavoritesButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="remove-favorite" class="favorite active">
    <i class="fa fa-heart" aria-hidden="true"></i> Remove from Favorites
  </button>
`

const createRestaurantDetailContainerTemplate = (restaurant = {
  menus: {
    foods: [],
    drinks: []
  },
  customerReviews: []
}) => {
  const imageEndPoint = API_ENDPOINT.IMAGE({
    pictureId: restaurant.pictureId,
    size: IMAGE_SIZE.LARGE
  })

  const categories = restaurant.categories
    .map((category) => `#${category.name}`)
    .join(', ')

  const foods = restaurant.menus.foods
    .map((menu) => `<li>${menu.name}</li>`)
    .join('\n')

  const drinks = restaurant.menus.drinks
    .map((menu) => `<li>${menu.name}</li>`)
    .join('\n')

  const customerReviews = restaurant.customerReviews
    .map(
      (review) => `
          <div class="review">
            <div class="message">${review.review}</div>
            <span><strong>${review.name}</strong> on <strong>${review.date}</strong></span>
          </div>
          `
    )
    .join('\n')

  return `
  <div class="restaurant-card">
      <div class="badge">Rating ${restaurant.rating}</div>
      <div class="restaurant-tumb">
          <img src="${imageEndPoint}" alt="${restaurant.name} Restaurant Picture">
      </div>
      <div class="restaurant-details">
          <span class="restaurant-city">${restaurant.city}</span>
          <h4>${restaurant.name}</h4>
          <p class="subtitle">${restaurant.address}</p>
          <p class="full">${restaurant.description}</p>
          <div class="foods-drinks">
            <div class="product">
              <p>Foods</p>
              <ul>${foods}</ul>
            </div>
            <div class="product">
              <p>Drinks</p>
              <ul>${drinks}</ul>
            </div>
          </div>
          <div class="restaurant-bottom-detail">
            <div class="categories">${categories}</div>
            <div id="favorite-container"></div>
          </div>
      </div>
  </div>
  <div class="user-reviews">
    <h4>Customer Reviews</h4>
    <div class="reviews">
    ${customerReviews}
    </div>
  </div>
  `
}

export {
  createRestaurantDetailContainerTemplate,
  createAddToFavoritesButtonTemplate,
  createRemoveFromFavoritesButtonTemplate
}
