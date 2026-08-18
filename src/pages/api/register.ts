import type {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import bcrypt from 'bcryptjs';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({
      message: 'Method not allowed',
    });
  }

  const { username, password } = request.body;

  if (!username || !password) {
    return response.status(400).json({
      message: 'Username and password are required',
    });
  }

  const existingResponse = await fetch(
    `${process.env.JSON_SERVER_URL}/admins?username=${encodeURIComponent(
      username
    )}`
  );

  const existingAdmins =
    await existingResponse.json();

  if (existingAdmins.length > 0) {
    return response.status(409).json({
      message: 'Username already exists',
    });
  }

  const passwordHash =
    await bcrypt.hash(password, 10);

  const createResponse = await fetch(
    `${process.env.JSON_SERVER_URL}/admins`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        passwordHash,
      }),
    }
  );

  const createdAdmin =
    await createResponse.json();

  return response.status(201).json(
    createdAdmin
  );
}