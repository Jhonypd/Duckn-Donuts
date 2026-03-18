export interface Produto {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
}

export interface CartItem extends Produto {
  quantity: number;
}
