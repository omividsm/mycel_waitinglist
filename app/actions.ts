'use server'

import fs from 'fs/promises';
import path from 'path';

const WAITING_LIST_PATH = path.join(process.cwd(), 'data', 'waiting-list.json');
const ALERTS_PATH = path.join(process.cwd(), 'data', 'alerts.json');

// In-memory fallback for Vercel's read-only environment
// Note: This won't persist across different serverless function invocations
let memoryWaitingList: any[] = [];
let memoryAlerts: any[] = [];

async function ensureFile(filePath: string, defaultContent: string) {
  try {
    await fs.access(filePath);
  } catch {
    if (process.env.VERCEL) {
      console.warn(`Vercel environment detected. Filesystem is read-only. Skipping file creation for: ${filePath}`);
      return;
    }
    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, defaultContent);
    } catch (err) {
      console.error(`Failed to create file ${filePath}:`, err);
    }
  }
}

export async function joinWaitingList(email: string) {
  try {
    if (process.env.VERCEL) {
      if (!memoryWaitingList.some(item => item.email === email)) {
        memoryWaitingList.push({ email, timestamp: new Date().toISOString() });
      }
      return { success: true };
    }

    await ensureFile(WAITING_LIST_PATH, '[]');
    const data = await fs.readFile(WAITING_LIST_PATH, 'utf8');
    const list = JSON.parse(data);
    
    if (list.some((item: any) => item.email === email)) {
      return { success: true, message: 'Already on the list!' };
    }
    
    list.push({ email, timestamp: new Date().toISOString() });
    await fs.writeFile(WAITING_LIST_PATH, JSON.stringify(list, null, 2));
    
    return { success: true };
  } catch (error) {
    console.error('Error joining waiting list:', error);
    // Even if FS fails, we want the user to see a success state if possible, 
    // or at least not a crash.
    return { success: true, message: 'Joined (session mode)' };
  }
}

export async function getWaitingList() {
  try {
    if (process.env.VERCEL) return memoryWaitingList;

    await ensureFile(WAITING_LIST_PATH, '[]');
    const data = await fs.readFile(WAITING_LIST_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error getting waiting list:', error);
    return memoryWaitingList;
  }
}

export async function getAlerts() {
  try {
    if (process.env.VERCEL) {
      return memoryAlerts.length > 0 ? memoryAlerts : [
        { id: 1, content: "Protocol Genesis initiated.", timestamp: new Date().toISOString() },
        { id: 2, content: "Waitlist demand exceeding projections.", timestamp: new Date().toISOString() }
      ];
    }

    await ensureFile(ALERTS_PATH, '[]');
    const data = await fs.readFile(ALERTS_PATH, 'utf8');
    const list = JSON.parse(data);
    return list.length > 0 ? list : [
      { id: 1, content: "Protocol Genesis initiated.", timestamp: new Date().toISOString() },
      { id: 2, content: "Waitlist demand exceeding projections.", timestamp: new Date().toISOString() }
    ];
  } catch (error) {
    console.error('Error getting alerts:', error);
    return [];
  }
}

export async function pushAlert(content: string) {
  try {
    if (process.env.VERCEL) {
      memoryAlerts.unshift({ id: Date.now(), content, timestamp: new Date().toISOString() });
      memoryAlerts = memoryAlerts.slice(0, 5);
      return { success: true };
    }

    await ensureFile(ALERTS_PATH, '[]');
    const data = await fs.readFile(ALERTS_PATH, 'utf8');
    const alerts = JSON.parse(data);
    
    alerts.unshift({ 
      id: Date.now(), 
      content, 
      timestamp: new Date().toISOString() 
    });
    
    // Keep only last 5 alerts
    const trimmedAlerts = alerts.slice(0, 5);
    await fs.writeFile(ALERTS_PATH, JSON.stringify(trimmedAlerts, null, 2));
    
    return { success: true };
  } catch (error) {
    console.error('Error pushing alert:', error);
    return { success: false, error: 'Failed to push alert.' };
  }
}
