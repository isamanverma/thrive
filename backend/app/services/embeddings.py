# app/services/embeddings.py
from sentence_transformers import SentenceTransformer
from app.models.recipe import Recipe
from app.models.recipe_embedding import RecipeEmbedding
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

# Load the model once at module level
model = SentenceTransformer("all-MiniLM-L6-v2")


def get_recipe_embedding(title: str, ingredients: list[str], instructions: list[str]) -> list[float]:
    """
    Generate an embedding for a recipe given its fields.
    """
    text = f"{title}. Ingredients: {', '.join(ingredients)}. Instructions: {' '.join(instructions)}"
    embedding = model.encode(text)
    return embedding.tolist()  # Convert numpy array → list


async def store_recipe_embedding(db: AsyncSession, recipe: Recipe) -> RecipeEmbedding:
    """
    Generate and store embedding for a given Recipe row.
    """
    # Generate embedding
    embedding_vector = get_recipe_embedding(
        recipe.title, recipe.ingredients, recipe.instructions)

    # Create RecipeEmbedding row
    embedding_row = RecipeEmbedding(
        id=str(uuid.uuid4()),
        recipe_id=recipe.id,
        embedding=embedding_vector  # Store as ARRAY(Float) to match the model
    )

    db.add(embedding_row)
    await db.commit()
    await db.refresh(embedding_row)
    return embedding_row
