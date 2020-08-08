# the-recipe-api

I'll be updating this post regularly when major changes happen.
The idea is to make an RESTful api, filled with some data (recipes) and whoever wants to use this recipes and add more recipes is welcome to do so.

## Endpoints

### Get all recipes

- GET https://us-central1-the-recipe-api.cloudfunctions.net/app/recipes

### Get 1 recipe

- GET https://us-central1-the-recipe-api.cloudfunctions.net/app/recipes/id

### Post a new recipe

- POST https://us-central1-the-recipe-api.cloudfunctions.net/app/recipes/create

### Update a recipe

- UPDATE/PUT https://us-central1-the-recipe-api.cloudfunctions.net/app/update/recipe/:id
