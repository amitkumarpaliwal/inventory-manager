import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

interface FormState {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const [formState, setFormState] = useState<FormState>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    if (formState.password !== formState.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const registerResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formState.username,
        password: formState.password,
      }),
    });

    const registerResult = await registerResponse.json();

    if (!registerResponse.ok) {
      throw new Error(
        registerResult.message || 'Registration failed'
      );
    }

    setSuccessMessage(
      'Account created successfully. Please login.'
    );

    setIsRegisterMode(false);

    setFormState({
      username: '',
      password: '',
      confirmPassword: '',
    });

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleLogin = async () => {
    const loginResult = await signIn('credentials', {
      username: formState.username,
      password: formState.password,
      redirect: false,
    });

    if (loginResult?.error) {
      throw new Error('Invalid username or password');
    }

    await router.replace('/dashboard');
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      if (isRegisterMode) {
        await handleRegister();
      } else {
        await handleLogin();
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Inventory Admin
        </h1>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => {
              setErrorMessage('');
              setSuccessMessage('');
              setIsRegisterMode(false);
            }}
            className={`flex-1 p-3 rounded-xl transition ${
              !isRegisterMode
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => {
              setErrorMessage('');
              setSuccessMessage('');
              setIsRegisterMode(true);
            }}
            className={`flex-1 p-3 rounded-xl transition ${
              isRegisterMode
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            Register
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            className="w-full border rounded-xl p-3"
            placeholder="Username"
            value={formState.username}
            onChange={(event) =>
              setFormState({
                ...formState,
                username: event.target.value,
              })
            }
          />

          <input
            type="password"
            className="w-full border rounded-xl p-3"
            placeholder="Password"
            value={formState.password}
            onChange={(event) =>
              setFormState({
                ...formState,
                password: event.target.value,
              })
            }
          />

          {isRegisterMode && (
            <input
              type="password"
              className="w-full border rounded-xl p-3"
              placeholder="Confirm Password"
              value={formState.confirmPassword}
              onChange={(event) =>
                setFormState({
                  ...formState,
                  confirmPassword: event.target.value,
                })
              }
            />
          )}

          {errorMessage && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-red-700">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="rounded-lg border border-green-300 bg-green-50 p-3 text-green-700">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl disabled:opacity-50"
          >
            {isSubmitting
              ? 'Please wait...'
              : isRegisterMode
                ? 'Register'
                : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: any
) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}