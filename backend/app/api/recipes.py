import random
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.models.recipe import Recipe
from app.models.recipe_embedding import RecipeEmbedding
from app.services.recipes import get_random_recipe_with_embedding
from app.schemas.recipe import RecipeWithEmbedding
import uuid

router = APIRouter()

FAKE_RECIPES = [
    {
        "title": "Avocado Toast",
        "ingredients": ["bread", "avocado", "salt", "lemon"],
        "instructions": ["toast bread", "mash avocado", "spread", "serve"],
        "cuisine": "American",
        "mealType": "breakfast",
    },
    {
        "title": "Pasta Alfredo",
        "ingredients": ["pasta", "cream", "parmesan", "garlic"],
        "instructions": ["boil pasta", "make sauce", "mix", "serve"],
        "cuisine": "Italian",
        "mealType": "dinner",
    },
    {
        "title": "Veggie Stir Fry",
        "ingredients": ["broccoli", "carrot", "soy sauce", "garlic"],
        "instructions": ["chop veggies", "stir fry", "add sauce", "serve"],
        "cuisine": "Asian",
        "mealType": "lunch",
    }
]


@router.post("/seed_random")
async def seed_random_recipe(db: AsyncSession = Depends(get_db)):
    recipe_data = random.choice(FAKE_RECIPES)

    recipe = Recipe(
        id=str(uuid.uuid4()),
        title=recipe_data["title"],
        ingredients=recipe_data["ingredients"],
        instructions=recipe_data["instructions"],
        cuisine=recipe_data["cuisine"],
        mealType=recipe_data["mealType"],
    )
    db.add(recipe)
    await db.commit()
    await db.refresh(recipe)

    # Fake embedding (real would be sentence-transformers.encode)
    embedding = [str(hash(word) % 1000) for word in recipe_data["ingredients"]]

    recipe_embedding = RecipeEmbedding(
        recipe_id=recipe.id,
        embedding=embedding
    )
    db.add(recipe_embedding)
    await db.commit()
    await db.refresh(recipe_embedding)

    return {"recipe": recipe.title, "id": str(recipe.id), "embedding": embedding}


@router.get("/random", response_model=RecipeWithEmbedding)
async def get_random_recipe(db: AsyncSession = Depends(get_db)):
    """
    Get a random recipe and its embedding.
    """
    result = await get_random_recipe_with_embedding(db)

    if not result:
        raise HTTPException(status_code=404, detail="No recipes found")

    recipe, embedding = result

    return RecipeWithEmbedding(
        recipe=recipe,
        embedding=embedding
    )
