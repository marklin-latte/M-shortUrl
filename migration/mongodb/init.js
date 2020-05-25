
db.createUser({
    user: 'mark',
    pwd: '123456789',
    roles: [
      {
        role: 'readWrite',
        db: 'testing'
      }
    ]
  })