Feature('Add Favorite Restaurant')

Scenario('showing empty favorites restaurant', ({ I }) => {
  I.amOnPage('#/favorites')
  I.see('You have no favorite restaurants yet', '#have-no-favorites')
})

// Scenario('adding restaurant to favorites', ({ I }) => {
//   I.amOnPage('#/detail/s1knt6za9kkfw1e867')
//   I.click('#add-favorite')
//   I.
// })
