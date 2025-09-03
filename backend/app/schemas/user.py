from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


class UserBase(BaseModel):
    clerkId: str
    email: EmailStr
    name: Optional[str] = None
    age: Optional[int] = None
    weight: Optional[float] = None
    goals: Optional[str] = None
    allergies: Optional[List[str]] = None


class UserCreate(UserBase):
    """Schema for creating a new user"""
    pass


class UserOut(UserBase):
    """Schema for returning a user"""
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        orm_mode = True
