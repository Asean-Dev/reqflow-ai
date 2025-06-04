# mock_users.py

# password hash ด้วย bcrypt ของ "secret"
user1 = {
    "email": "user@email.com",
    "full_name": "User Example",
    "hashed_password": "$2b$12$Cz/8gZQ8kMuByHLrfTlgdOlE4qZ60PewAwCB9w2qJvRkzVsh8en9W",  # secret
    "disabled": False,
}

user2 = {
    "email": "admin@email.com",
    "full_name": "Admin User",
    "hashed_password": "$2b$12$gww9KYksFoPbWjDCln/d0.1f6lsZ9K9zFGzzvB6TVxENjIrOK3cVW",  # password: admin123
    "disabled": False,
}

user3 = {
    "email": "guest@email.com",
    "full_name": "Guest User",
    "hashed_password": "$2b$12$XFlY5ttJbF01EFoEoQjICeVtC4Fx0hEPNnvUtDXo9Q3PrCApLNLh2",  # password: guest
    "disabled": True,
}

# จำลองเหมือน database แบบ dictionary
fake_users_db = {
    user1["email"]: user1,
    user2["email"]: user2,
    user3["email"]: user3,
}
