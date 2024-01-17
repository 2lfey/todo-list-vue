export const saveBoard = (board) => {
  localStorage.setItem('board', JSON.stringify(board));
}

export const getBoard = () => {
  return JSON.parse(localStorage.getItem('board')) || [[],[],[]];
}