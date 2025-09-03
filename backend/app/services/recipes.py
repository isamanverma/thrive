# app/services/recipes.py
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models.recipe import Recipe
from app.schemas.recipe import RecipeCreate, RecipeOut
from app.services.embeddings import store_recipe_embedding


async def create_recipe(db: AsyncSession, recipe_in: RecipeCreate) -> RecipeOut:
    """
    Create a new recipe and generate embedding for it.
    """
    # Create recipe row
    recipe = Recipe(
        id=str(uuid.uuid4()),
        title=recipe_in.title,
        ingredients=recipe_in.ingredients,
        instructions=recipe_in.instructions,
        cuisine=recipe_in.cuisine,
        nutrition=recipe_in.nutrition,
        mealType=recipe_in.mealType,
    )

    db.add(recipe)
    await db.commit()
    await db.refresh(recipe)

    # Generate + store embedding
    await store_recipe_embedding(db, recipe)

    return RecipeOut.from_orm(recipe)


async def get_recipe(db: AsyncSession, recipe_id: str) -> RecipeOut | None:
    """
    Get a recipe by ID.
    """
    result = await db.execute(select(Recipe).where(Recipe.id == recipe_id))
    recipe = result.scalars().first()
    return RecipeOut.from_orm(recipe) if recipe else None


async def list_recipes(db: AsyncSession, skip: int = 0, limit: int = 10) -> list[RecipeOut]:
    """
    List recipes with pagination.
    """
    result = await db.execute(select(Recipe).offset(skip).limit(limit))
    recipes = result.scalars().all()
    return [RecipeOut.from_orm(r) for r in recipes]


async def get_random_recipe_with_embedding(db: AsyncSession) -> tuple[RecipeOut, list] | None:
    """
    Get a random recipe with its embedding.
    """
    import random
    from sqlalchemy import func
    from app.models.recipe_embedding import RecipeEmbedding

    # Get count of recipes
    result = await db.execute(select(func.count()).select_from(Recipe))
    count = result.scalar()

    if count == 0:
        return None

    # Get a random offset
    random_offset = random.randint(0, count - 1)

    # Get a random recipe
    result = await db.execute(select(Recipe).offset(random_offset).limit(1))
    recipe = result.scalars().first()

    if not recipe:
        return None

    # Get the embedding for this recipe
    result = await db.execute(
        select(RecipeEmbedding).where(RecipeEmbedding.recipe_id == recipe.id)
    )
    embedding = result.scalars().first()

    recipe_out = RecipeOut.from_orm(recipe)
    return recipe_out, embedding.embedding if embedding else []
