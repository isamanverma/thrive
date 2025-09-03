# app/models/recipe.py
from sqlalchemy import Column, String, DateTime, JSON, ARRAY
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime, UTC  # Import UTC
from app.db.base import Base


class Recipe(Base):
    __tablename__ = "Recipe"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    ingredients = Column(ARRAY(String), nullable=False)
    instructions = Column(ARRAY(String), nullable=False)

    # --- ADDED MISSING COLUMNS ---
    source = Column(String, nullable=True)
    link = Column(String, nullable=True)
    # Assuming nullable or default empty array
    namedEntities = Column(ARRAY(String), nullable=True, default=[])
    # -----------------------------

    nutrition = Column(JSON, nullable=True)
    cuisine = Column(String, nullable=True)
    mealType = Column(String, nullable=True)

    # --- UPDATED to use datetime.now(UTC) ---
    createdAt = Column(DateTime, default=lambda: datetime.now(UTC))
    updatedAt = Column(DateTime, default=lambda: datetime.now(UTC),
                       onupdate=lambda: datetime.now(UTC))
    # ----------------------------------------

    # This relationship seems specific to your Python service's needs
    embeddings = relationship(
        "RecipeEmbedding",
        back_populates="recipe",
        cascade="all, delete-orphan"
    )
