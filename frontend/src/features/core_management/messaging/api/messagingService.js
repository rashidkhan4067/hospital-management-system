/**
 * 🛰️ Messaging API Service
 * Simulated clinical communication layer for local role-to-role dispatch.
 */

// 🧪 Simulated User Registry
const CONTACTS = [
  { id: 'usr-1', name: 'Dr. Sarah Ahmed', role: 'Head of Cardiology', status: 'online', avatar: 'SA' },
  { id: 'usr-2', name: 'Dr. John Carter', role: 'Chief Resident', status: 'away', avatar: 'JC' },
  { id: 'usr-3', name: 'Nurse Elena', role: 'ICU Supervisor', status: 'online', avatar: 'NE' },
  { id: 'usr-4', name: 'Admin Michael', role: 'Operations', status: 'online', avatar: 'AM' },
];

let MOCK_MESSAGES = [
  { id: 'msg-1', senderId: 'usr-1', receiverId: 'me', text: 'Hey, did you check the lab results for Room 402?', timestamp: '10:45 AM', role: 'Doctor' },
  { id: 'msg-2', senderId: 'me', receiverId: 'usr-1', text: 'Just finished reviewing. The BP is stabilizing.', timestamp: '10:47 AM', role: 'Admin' },
  { id: 'msg-3', senderId: 'usr-3', receiverId: 'me', text: 'Emergency ward is at 95% capacity. Need authorization for more beds.', timestamp: '11:02 AM', role: 'Nurse' },
];

export const messagingService = {
  /**
   * 📡 Fetch clinical contacts
   */
  getContacts: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return CONTACTS;
  },

  /**
   * 📬 Fetch message thread for a contact
   */
  getThread: async (contactId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_MESSAGES.filter(m => 
      (m.senderId === contactId && m.receiverId === 'me') || 
      (m.senderId === 'me' && m.receiverId === contactId)
    );
  },

  /**
   * 📤 Send clinical dispatch
   */
  sendMessage: async (receiverId, text) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      receiverId,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      role: 'Admin'
    };
    MOCK_MESSAGES.push(newMessage);
    
    // 🧠 Simulated Auto-Response (Clinical AI/Bot)
    if (text.toLowerCase().includes('status')) {
        setTimeout(() => {
            MOCK_MESSAGES.push({
                id: `msg-bot-${Date.now()}`,
                senderId: receiverId,
                receiverId: 'me',
                text: 'System heartbeat is normal. Telemetry nominal.',
                timestamp: 'Just now',
                role: 'System'
            });
        }, 1500);
    }
    
    return newMessage;
  }
};
