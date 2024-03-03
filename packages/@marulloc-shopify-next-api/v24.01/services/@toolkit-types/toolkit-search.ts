import { ToolkitCollection } from './toolkit-collection';
import { ToolkitProduct } from './toolkit-product';

export type ToolkitPredictiveSearch = {
  products: ToolkitProduct[];
  collections: ToolkitCollection[];
};

export type ToolkitSortKey = 'relevance' | 'plth' | 'phtl';
