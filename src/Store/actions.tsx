export interface Action {
  type: string
}

export const addCount = () => ({
  type: 'ADD_COUNT'
});

export const removeCount = () => ({
  type: 'REMOVE_COUNT'
});
