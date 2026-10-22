import { Request, Response } from 'express';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

let menuItems: MenuItem[] = [
  { id: 1, name: 'Burger', price: 75, category: 'Food' },
  { id: 2, name: 'Pizza', price: 120, category: 'Food' },
  { id: 3, name: 'Orange Juice', price: 30, category: 'Drinks' },
];

export const getItems = (req: Request, res: Response) => {
  res.json({ success: true, data: menuItems });
};

export const getItemById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = menuItems.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  res.json({ success: true, data: item });
};

export const createItem = (req: Request, res: Response) => {
  const { name, price, category } = req.body;

  if (!name || !price) {
    return res.status(400).json({ success: false, message: 'Name and price are required' });
  }

  const newItem: MenuItem = {
    id: Date.now(),
    name,
    price: Number(price),
    category: category || 'General',
  };

  menuItems.push(newItem);

  res.status(201).json({
    success: true,
    message: 'Item created successfully',
    data: newItem,
  });
};

export const deleteItem = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const initialLength = menuItems.length;
  menuItems = menuItems.filter((i) => i.id !== id);

  if (menuItems.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  res.json({ success: true, message: 'Item deleted successfully' });
};
