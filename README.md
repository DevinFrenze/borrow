# Borrow
a node server i'm making for practice. api has users and books and users borrow books from each other.

### TODO
- figure out how to get token without "Basic q9283e7jq29083es7qj2398ejyq923yrcj"
- add proper testing
- test for password strength or min length ?
- refine error throwing (should throw a wider variety of status codes)
- build a tiny frontend ?
- search for book by location / proximity
- figure out if the "client" and oauth stuff is not necessary
- refresh token

### NOTES
- in the request to get tokens, you must include an "Authentication: Basic aWQ6c2VjcmV0" header
  - that code is `btoa(id:secret)`, change accordingly for when / if we seed a different client
- the "client" model and related auth code doesn't really do anything
  - it _might_ help just because oauth2 expects to create a token from the client and user
