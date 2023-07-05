import { testCaseFactory } from 'utils/test';
import { nextSearchState } from './paginator';

describe('Utils/Paginator', () => {
  testCaseFactory(nextSearchState, [
    {
      name: 'not prefetch for the 1st page',
      params: [{
        count: 100,
        hasMoreItems: true,
        maxItems: 100,
        skipCount: 0,
        totalItems: 30875
      }, {
        previousPageIndex: 0,
        pageIndex: 0,
        pageSize: 10,
        length: 30875
      }],
      expected: null
    },
    {
      name: 'not prefetch for the 2nd page',
      params: [{
        count: 100,
        hasMoreItems: true,
        maxItems: 100,
        skipCount: 0,
        totalItems: 30875
      }, {
        previousPageIndex: 0,
        pageIndex: 1,
        pageSize: 10,
        length: 30875
      }],
      expected: null
    },
    {
      name: 'not prefetch for the 3rd page',
      params: [{
        count: 100,
        hasMoreItems: true,
        maxItems: 100,
        skipCount: 0,
        totalItems: 30875
      }, {
        previousPageIndex: 1,
        pageIndex: 2,
        pageSize: 10,
        length: 30875
      }],
      expected: null
    },
    {
      name: 'not prefetch for the 4th page',
      params: [{
        count: 100,
        hasMoreItems: true,
        maxItems: 100,
        skipCount: 0,
        totalItems: 30875
      }, {
        previousPageIndex: 2,
        pageIndex: 3,
        pageSize: 10,
        length: 30875
      }],
      expected: null
    },
    {
      name: 'not prefetch for the 5th page',
      params: [{
        count: 100,
        hasMoreItems: true,
        maxItems: 100,
        skipCount: 0,
        totalItems: 30875
      }, {
        previousPageIndex: 3,
        pageIndex: 4,
        pageSize: 10,
        length: 30875
      }],
      expected: null
    },
    {
      name: 'not prefetch for the 6th page',
      params: [{
        count: 100,
        hasMoreItems: true,
        maxItems: 100,
        skipCount: 0,
        totalItems: 30875
      }, {
        previousPageIndex: 4,
        pageIndex: 5,
        pageSize: 10,
        length: 30875
      }],
      expected: null
    },
    {
      name: 'not prefetch for the 7th page',
      params: [{
        count: 100,
        hasMoreItems: true,
        maxItems: 100,
        skipCount: 0,
        totalItems: 30875
      }, {
        previousPageIndex: 5,
        pageIndex: 6,
        pageSize: 10,
        length: 30875
      }],
      expected: null
    },
    {
      name: 'not prefetch for the 8th page',
      params: [{
        count: 100,
        hasMoreItems: true,
        maxItems: 100,
        skipCount: 0,
        totalItems: 30875
      }, {
        previousPageIndex: 6,
        pageIndex: 7,
        pageSize: 10,
        length: 30875
      }],
      expected: null
    },
    {
      name: 'not prefetch for the 9th page',
      params: [{
        count: 100,
        hasMoreItems: true,
        maxItems: 100,
        skipCount: 0,
        totalItems: 30875
      }, {
        previousPageIndex: 7,
        pageIndex: 8,
        pageSize: 10,
        length: 30875
      }],
      expected: null
    },
    {
      name: 'prefetch for the 10th page',
      params: [{
        count: 100,
        hasMoreItems: true,
        maxItems: 100,
        skipCount: 0,
        totalItems: 30875
      }, {
        previousPageIndex: 8,
        pageIndex: 9,
        pageSize: 10,
        length: 30875
      }],
      expected: {
        skipCount: 100
      }
    },
    {
      name: 'not prefetch for the 11th page when skipCount is set',
      params: [{
        count: 100,
        hasMoreItems: true,
        maxItems: 100,
        skipCount: 100,
        totalItems: 30875
      }, {
        previousPageIndex: 0,
        pageIndex: 9,
        pageSize: 10,
        length: 30875
      }],
      expected: null
    },
    {
      name: 'not prefetch for the 11th page when there is no skipcount',
      params: [{
        count: 100,
        hasMoreItems: true,
        maxItems: 100,
        skipCount: 0,
        totalItems: 30875
      }, {
        previousPageIndex: 0,
        pageIndex: 10,
        pageSize: 10,
        length: 30875
      }],
      expected: {
        skipCount: 110
      }
    },
    // Prefetch tests
    {
      name: 'not pre-fetch',
      params: [{
        count: 100,
        hasMoreItems: true,
        maxItems: 100,
        skipCount: 0,
        totalItems: 30875
      }, {
        previousPageIndex: 8,
        pageIndex: 9,
        pageSize: 10,
        length: 30875
      }, 0],
      expected: null
    },
    {
      name: 'pre-fetch 2 pages ahead',
      params: [{
        count: 100,
        hasMoreItems: true,
        maxItems: 100,
        skipCount: 0,
        totalItems: 30875
      }, {
        previousPageIndex: 7,
        pageIndex: 8,
        pageSize: 10,
        length: 30875
      }, 2],
      expected: {
        skipCount: 100
      }
    },
  ]);
});
