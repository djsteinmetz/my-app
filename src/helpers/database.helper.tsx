  
import  sqlite from 'sqlite';

// you would have to import / invoke this in another file
export async function openDB () {
  return sqlite.open('./mydb.sqlite');
}