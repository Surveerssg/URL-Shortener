// Stateful authentication
// const sessionIdToUserMap = new Map(); 
// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }

//Stateless authentication
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Surveer$222@$"

function setUser( user) {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
  }, JWT_SECRET);
}
function getUser(token) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};