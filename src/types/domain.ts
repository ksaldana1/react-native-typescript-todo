export namespace Todo {
  export interface Item {
    label: string;
    completed: boolean;
    id: string;
  }

  export interface Fetcher {
    fetchItems: () => Promise<Todo.Item[]>;
  }

  export interface Adder {
    addItem: (label: string) => Promise<Todo.Item[]>;
  }

  export interface Deleter {
    deleteItem: (id: Todo.Item['id']) => Promise<Todo.Item[]>;
  }

  export interface Toggler {
    toggleItem: (id: Todo.Item['id']) => Promise<Todo.Item[]>;
  }

  export interface Clearer {
    clearCompletedItems: () => Promise<Todo.Item[]>;
  }

  export interface Resetter {
    resetItems: () => Promise<Todo.Item[]>;
  }

  export type Service = Fetcher & Adder & Deleter & Toggler & Clearer & Resetter;
}
