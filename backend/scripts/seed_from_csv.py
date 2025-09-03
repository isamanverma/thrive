import asyncio
import csv
import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from app.models.recipe import Recipe
from app.models.recipe_embedding import RecipeEmbedding
from app.services.embeddings import get_recipe_embedding
import uuid
from datetime import datetime, UTC
import ast
from tqdm import tqdm

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_async_engine(DATABASE_URL, future=True)
AsyncSessionLocal = sessionmaker(
    engine, expire_on_commit=False, class_=AsyncSession)

CSV_PATH = "recipe_dataset.csv"
BATCH_SIZE = 128  # Process 128 recipes at a time


async def seed():
    async with AsyncSessionLocal() as session:
        with open(CSV_PATH, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            rows = list(reader)

            # Process the rows in chunks of BATCH_SIZE
            for i in tqdm(range(0, len(rows), BATCH_SIZE), desc="Seeding Recipe Batches"):
                batch_rows = rows[i:i + BATCH_SIZE]

                recipe_objects = []
                for row in batch_rows:
                    recipe_objects.append(
                        Recipe(
                            id=str(uuid.uuid4()),
                            title=row["title"],
                            ingredients=ast.literal_eval(
                                row["ingredients"]) if row.get("ingredients") else [],
                            instructions=ast.literal_eval(
                                row["directions"]) if row.get("directions") else [],
                            cuisine=row.get("cuisine"),
                            mealType=row.get("mealType"),
                            createdAt=datetime.now(UTC).replace(tzinfo=None),
                            updatedAt=datetime.now(UTC).replace(tzinfo=None),
                            nutrition=None,
                        )
                    )

                # Add all recipes in the batch to the session
                session.add_all(recipe_objects)
                # Flush to assign IDs to all recipes in the batch
                await session.flush()

                # Now that recipes have IDs, create their embeddings
                embedding_objects = []
                for recipe in recipe_objects:
                    embedding_vector = get_recipe_embedding(
                        recipe.title, recipe.ingredients, recipe.instructions
                    )
                    embedding_objects.append(
                        RecipeEmbedding(
                            id=str(uuid.uuid4()),
                            recipe_id=recipe.id,
                            embedding=embedding_vector
                        )
                    )

                # Add all embeddings in the batch to the session
                session.add_all(embedding_objects)
                # Commit the entire batch of recipes and embeddings
                await session.commit()

    print("\nDatabase seeding completed successfully!")

if __name__ == "__main__":
    asyncio.run(seed())
