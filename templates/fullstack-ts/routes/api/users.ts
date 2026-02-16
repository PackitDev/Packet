import { db } from '@effec-t/db';

// Define User model
const User = db.model('User', {
  name: { type: 'string', required: true },
  email: { type: 'string', required: true, unique: true },
  createdAt: { type: 'date', default: () => new Date() },
});

export async function GET(req: any, res: any) {
  const users = await User.findAll();
  return users;
}

export async function POST(req: any, res: any) {
  const { name, email } = req.body;
  
  if (!name || !email) {
    res.status(400);
    return { error: 'Name and email are required' };
  }

  const user = await User.create({ name, email });
  return user;
}
