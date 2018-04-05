const fs = require('fs');
const Path = './server/data/users.json';
module.exports = function (user) {
    let res = fs.readFileSync(Path);
    if (res) {
        if (JSON.parse(res).find((el) => {
            if (user.Username === el.Username && user.Password === el.Password)
                return true;
            return false;
        }))
            return true;
    }
    return false;
}