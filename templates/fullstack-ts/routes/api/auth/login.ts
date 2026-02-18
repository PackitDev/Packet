import { auth } from '@packet/auth';
import { db } from '@packet/db';

const User = db.model('User', {
  email: { type: 'string', required: true, unique: true },
  password: { type: 'string', required: true },
});

export async function POST(req: any, res: any) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    return { error: 'Email and password are required' };
  }

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    return { error: 'Invalid credentials' };
  }

  // Verify password
  const authInstance = auth({
    provider: 'jwt',
    jwt: { secret: process.env.JWT_SECRET || 'secret' },
  });

  const isValid = await authInstance.password.comparePassword(password, user.password);
  if (!isValid) {
    res.status(401);
    return { error: 'Invalid credentials' };
  }

  // Generate token
  const token = authInstance.jwt.createToken(
    { userId: user.id, email: user.email },
    { secret: process.env.JWT_SECRET || 'secret' }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
}
