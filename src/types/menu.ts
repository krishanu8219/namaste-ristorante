export type MenuCategoryId =
  | 'antipasti'
  | 'griglia'
  | 'pollo'
  | 'agnello'
  | 'gamberi'
  | 'verdure'
  | 'pane'
  | 'riso'
  | 'dolci'
  | 'bevande'
  | 'birre'
  | 'vini';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: MenuCategoryId;
  isTopSeller?: boolean;
  tags?: string[];
  image?: string;
}

export interface MenuCategory {
  id: MenuCategoryId;
  name: string;
  items: MenuItem[];
}