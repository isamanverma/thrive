from sqlalchemy import Column, ForeignKey, Float, String
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import relationship
from app.db.base import Base
import uuid

class RecipeEmbedding(Base):
    __tablename__ = "RecipeEmbedding"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    recipe_id = Column(String, ForeignKey("Recipe.id", ondelete="CASCADE"), unique=True)
    embedding = Column(ARRAY(Float))

    recipe = relationship("Recipe", back_populates="embeddings")
