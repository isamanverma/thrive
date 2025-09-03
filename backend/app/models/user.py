# app/models/user.py
import uuid
from sqlalchemy import Column, String, Integer, Float, DateTime, func, ARRAY
from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    clerk_id = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=True)
    age = Column(Integer, nullable=True)
    weight = Column(Float, nullable=True)
    goals = Column(String, nullable=True)
    allergies = Column(ARRAY(String), nullable=True)  # Postgres text
