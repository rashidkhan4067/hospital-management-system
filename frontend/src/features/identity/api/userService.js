import BaseService from '@/services/BaseService';

/**
 * 🧛 User Service (OOPS: Inheritance)
 * Handles all authentication and specialized account operations.
 */
class UserService extends BaseService {
  constructor() {
    super('auth/users/');
  }

  /**
   * 🛡️ DSA: Efficient User Lookup
   * Uses a Set to quickly check if an email exists in a list.
   */
  hasEmail(users, email) {
    const emails = new Set(users.map(u => u.email.toLowerCase()));
    return emails.has(email.toLowerCase());
  }

  /**
   * Overriding default create for extra validation or logging.
   */
  async create(userData) {
    console.log(`[BaseService] Creating new user record (${userData.role})`);
    return super.create(userData);
  }
}

const userService = new UserService();
export { userService };
export default userService;
