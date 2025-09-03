from pydantic import BaseModel
from typing import List, Optional, Union, Any
from datetime import datetime


class RecipeBase(BaseModel):
    title: str
    ingredients: List[str]
    instructions: List[str]
    cuisine: Optional[str] = None
    nutrition: Optional[dict] = None
    mealType: Optional[str] = None


class RecipeCreate(RecipeBase):
    """Schema for creating a new recipe"""
    pass


class RecipeOut(RecipeBase):
    """Schema for returning a recipe"""
    id: str
    createdAt: datetime

    class Config:
        from_attributes = True  # Updated from orm_mode for Pydantic V2


class RecipeWithEmbedding(BaseModel):
    """Schema for returning a recipe with its embedding"""
    recipe: RecipeOut
    embedding: List[Union[float, str]]
