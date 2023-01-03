Feature('Remove Favorite Restaurant')

Before(({ I }) => {
  I.amOnPage('/')
  I.waitToHide('#loading')
  I.seeElement('restaurant-elm')
  I.click(locate('restaurant-elm a').first())
  I.waitToHide('#loading')
  I.seeElement('button#add-favorite')
  I.wait(1)
  I.click('button#add-favorite')
  I.amOnPage('#/favorites')
  I.waitToHide('#loading')
})

Scenario('showing favorites restaurant', ({ I }) => {
  I.dontSeeElement('#have-no-favorites')
})

Scenario('remove one restaurant to favorites', async ({ I }) => {
  I.click(locate('restaurant-elm a').first())
  I.waitToHide('#loading')
  I.seeElement('.restaurant-details')
  const restaurantTitle = await I.grabTextFrom('.restaurant-details h4')
  I.seeElement('button#remove-favorite')
  I.wait(1)
  I.click('button#remove-favorite')
  I.amOnPage('#/favorites')
  I.waitToHide('#loading')
  I.dontSeeElement('restaurant-elm')
  I.dontSee(restaurantTitle, '#restaurant-deck')
})
