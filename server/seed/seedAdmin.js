// One-off script to create the initial admin account.
// Run with: npm run seed:admin
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';

dotenv.config();

const seedAdmin = async () => {
  await connectDB();

  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
    process.exit(1);
  }

  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log(`Admin with email ${ADMIN_EMAIL} already exists. Skipping.`);
    process.exit(0);
  }

  await User.create({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD, // hashed automatically by the User model
    role: 'admin',
  });

  console.log(`Admin user created for ${ADMIN_EMAIL}`);
  process.exit(0);
};

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
