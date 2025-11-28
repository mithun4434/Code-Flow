import { User } from '../types';

const STORAGE_KEY_USER = 'codeflow_user_session';
const STORAGE_KEY_USERS_DB = 'codeflow_users_db';

// Internal type extending User to store secrets securely (in localStorage context)
interface UserRecord extends User {
  password?: string;
}

const getUsersDB = (): Record<string, UserRecord> => {
  try {
    const db = localStorage.getItem(STORAGE_KEY_USERS_DB);
    return db ? JSON.parse(db) : {};
  } catch (e) {
    console.error("Failed to parse users DB", e);
    return {};
  }
};

const saveUserToDB = (user: UserRecord) => {
  try {
    const db = getUsersDB();
    db[user.email] = user;
    localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(db));
  } catch (e) {
    console.error("Failed to save user to DB", e);
  }
};

export const login = async (
  provider: User['provider'], 
  email?: string, 
  password?: string
): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  let user: UserRecord;

  if (provider === 'guest') {
    user = {
      id: 'guest_' + Date.now(),
      name: 'Guest User',
      email: 'guest@codeflow.local',
      provider: 'guest',
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=guest'
    };
  } 
  else if (provider === 'email') {
    if (!email || !password) throw new Error("Email and password are required.");
    
    const db = getUsersDB();
    const existingUser = db[email];

    if (!existingUser) {
      throw new Error("Account not found. Please sign up.");
    }

    // Check password (simple string comparison for client-side demo)
    if (existingUser.password && existingUser.password !== password) {
      throw new Error("Incorrect password.");
    }

    // Legacy support: If user exists from old version without password, set it now
    if (!existingUser.password) {
      existingUser.password = password;
      saveUserToDB(existingUser);
    }

    user = existingUser;
  } 
  else {
    // Social Providers (Mock)
    const mockEmail = email || `${provider}_user@example.com`;
    const db = getUsersDB();
    
    if (db[mockEmail]) {
      user = db[mockEmail];
    } else {
      user = {
        id: `user_${Date.now()}`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        email: mockEmail,
        provider: provider,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${mockEmail}`
      };
      saveUserToDB(user);
    }
  }

  // Strip password before returning session user
  const { password: _, ...safeUser } = user;
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(safeUser));
  return safeUser;
};

export const register = async (email: string, password: string, name: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const db = getUsersDB();
  if (db[email]) {
    throw new Error("User with this email already exists.");
  }

  const newUser: UserRecord = {
    id: `user_${Date.now()}`,
    name: name,
    email: email,
    provider: 'email',
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    password: password
  };

  saveUserToDB(newUser);

  const { password: _, ...safeUser } = newUser;
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(safeUser));
  return safeUser;
};

export const logout = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  localStorage.removeItem(STORAGE_KEY_USER);
};

export const getCurrentUser = (): User | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_USER);
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.error("Failed to parse current user", e);
    return null;
  }
};
