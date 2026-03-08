const bcrypt = require('bcrypt');
const password = 'LotuusPassword123!';
bcrypt.hash(password, 10, function (err, hash) {
    if (err) console.error(err);
    console.log(hash);
});
