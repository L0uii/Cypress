export interface GroupUser {
  list: {
    pagination: {
      count: number;
      hasMoreItems: boolean;
      totalItems: number;
      skipCount: number;
      maxItems: number;
    };
    entries: [
      {
        entry: {
          isRoot: boolean;
          id: string;
          displayName?: string;
        }
      }
    ]
  };
}
