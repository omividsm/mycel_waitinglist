'use server'

import fs from 'fs/promises';
import path from 'path';

const WAITING_LIST_PATH = path.join(process.cwd(), 'data', 'waiting-list.json');
const ALERTS_PATH = path.join(process.cwd(), 'data', 'alerts.json');

async function ensureFile(filePath: string, defaultContent: string) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, defaultContent);
  }
}

export async function joinWaitingList(email: string) {
  try {
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
    return { success: false, error: 'Failed to join waiting list.' };
  }
}

export async function getWaitingList() {
  try {
    await ensureFile(WAITING_LIST_PATH, '[]');
    const data = await fs.readFile(WAITING_LIST_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error getting waiting list:', error);
    return [];
  }
}

export async function getAlerts() {
  try {
    await ensureFile(ALERTS_PATH, '[]');
    const data = await fs.readFile(ALERTS_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error getting alerts:', error);
    return [];
  }
}

export async function pushAlert(content: string) {
  try {
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
