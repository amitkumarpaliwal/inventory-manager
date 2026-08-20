import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

interface RegisterRequest {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body: RegisterRequest =
      await request.json();

    const { username, password } = body;

    if (!username?.trim() || !password?.trim()) {
      return NextResponse.json(
        {
          message:
            'Username and password are required',
        },
        {
          status: 400,
        }
      );
    }

    const existingUserResponse = await fetch(
      `${process.env.JSON_SERVER_URL}/admins?username=${encodeURIComponent(
        username.trim()
      )}`,
      {
        cache: 'no-store',
      }
    );

    if (!existingUserResponse.ok) {
      return NextResponse.json(
        {
          message:
            'Unable to validate existing users',
        },
        {
          status: 500,
        }
      );
    }

    const existingAdmins =
      await existingUserResponse.json();

    if (
      Array.isArray(existingAdmins) &&
      existingAdmins.length > 0
    ) {
      return NextResponse.json(
        {
          message: 'Username already exists',
        },
        {
          status: 409,
        }
      );
    }

    const passwordHash =
      await bcrypt.hash(password, 10);

    const createAdminResponse = await fetch(
      `${process.env.JSON_SERVER_URL}/admins`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          passwordHash,
          createdAt:
            new Date().toISOString(),
        }),
      }
    );

    if (!createAdminResponse.ok) {
      return NextResponse.json(
        {
          message:
            'Failed to create admin account',
        },
        {
          status: 500,
        }
      );
    }

    const createdAdmin =
      await createAdminResponse.json();

    return NextResponse.json(
      {
        id: createdAdmin.id,
        username:
          createdAdmin.username,
        message:
          'Admin account created successfully',
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      'Register API error:',
      error
    );

    return NextResponse.json(
      {
        message:
          'An unexpected error occurred',
      },
      {
        status: 500,
      }
    );
  }
}