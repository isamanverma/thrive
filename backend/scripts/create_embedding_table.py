import asyncio
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Remove SQLAlchemy prefix if present
def clean_db_url(url):
    if url.startswith("postgresql+asyncpg://"):
        return url.replace("postgresql+asyncpg://", "postgresql://", 1)
    return url

async def create_recipe_embedding_table():
    db_url = clean_db_url(DATABASE_URL)
    conn = await asyncpg.connect(dsn=db_url)
    await conn.execute('''
        CREATE TABLE IF NOT EXISTS "RecipeEmbedding" (
            id VARCHAR PRIMARY KEY,
            recipe_id VARCHAR REFERENCES "Recipe"(id),
            embedding VARCHAR[]
        );
    ''')
    await conn.close()

if __name__ == "__main__":
    asyncio.run(create_recipe_embedding_table())
