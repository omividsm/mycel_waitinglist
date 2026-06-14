'use server'

import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'waiting-list.json');

export async function joinWaitingList(email: string) {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    const list = JSON.parse(data);
    
    if (list.includes(email)) {
      return { success: true, message: 'Already on the list!' };
    }
    
    list.push({ email, timestamp: new Date().toISOString() });
    await fs.writeFile(DATA_PATH, JSON.stringify(list, null, 2));
    
    return { success: true };
  } catch (error) {
    console.error('Error joining waiting list:', error);
    return { success: false, error: 'Failed to join waiting list.' };
  }
}

export async function getWaitingList() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error getting waiting list:', error);
    return [];
  }
}
