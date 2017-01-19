# Borrow
a node server i'm making for practice. api has users and books and users borrow books from each other.

### TODO
- search for book by location / proximity
- figure out if the "client" and oauth stuff is not necessary
- password encryption
- refresh token
- add scope to models

### NOTES
- the "client" model and related auth code doesn't really do anything
  - it _might_ help just because oauth2 expects to create a token from the client and user
