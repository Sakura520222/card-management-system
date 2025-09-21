/**
 * Generates a card key with format: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-YYYY-MM-DD
 * Where X is a random uppercase letter and the date part is the current date
 * @returns {string} The generated card key
 */
function generateCardKey() {
  // Generate 26 random uppercase letters
  let letters = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  
  for (let i = 0; i < 26; i++) {
    letters += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  // Get current date in YYYY-MM-DD format
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;
  
  // Combine letters and date
  return `${letters}-${dateString}`;
}

module.exports = { generateCardKey };
