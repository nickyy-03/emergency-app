import { AppInfo, EmergencyContact } from './types';
// Fix: Replace unsupported lucide-react icons with available alternatives.
import { Phone, MessageSquare, Bot, Map, Instagram, Twitter, Facebook, Youtube, Music, Mail, Slack, Linkedin, Film, Twitch, Pin, AtSign, Video, Camera, Settings, MessageCircle } from 'lucide-react';

export const ALL_APPS: AppInfo[] = [
  { id: 'phone', name: 'Phone', Icon: Phone, isEssential: true },
  { id: 'sms', name: 'SMS', Icon: MessageSquare, isEssential: true },
  { id: 'whatsapp', name: 'WhatsApp', Icon: Bot, isEssential: true },
  { id: 'maps', name: 'Maps', Icon: Map, isEssential: true },
  { id: 'instagram', name: 'Instagram', Icon: Instagram, isEssential: false },
  { id: 'twitter', name: 'Twitter', Icon: Twitter, isEssential: false },
  { id: 'facebook', name: 'Facebook', Icon: Facebook, isEssential: false },
  { id: 'youtube', name: 'Youtube', Icon: Youtube, isEssential: false },
  // Fix: The 'Spotify' icon does not exist in lucide-react. Replaced with 'Music'.
  { id: 'spotify', name: 'Spotify', Icon: Music, isEssential: false },
  // Fix: The 'Gmail' icon does not exist in lucide-react. Replaced with 'Mail'.
  { id: 'gmail', name: 'Gmail', Icon: Mail, isEssential: false },
  { id: 'slack', name: 'Slack', Icon: Slack, isEssential: false },
  { id: 'linkedin', name: 'Linkedin', Icon: Linkedin, isEssential: false },
  // Fix: The 'Netflix' icon does not exist in lucide-react. Replaced with 'Film'.
  { id: 'netflix', name: 'Netflix', Icon: Film, isEssential: false },
  { id: 'twitch', name: 'Twitch', Icon: Twitch, isEssential: false },
  // Fix: The 'Pinterest' icon does not exist in lucide-react. Replaced with 'Pin'.
  { id: 'pinterest', name: 'Pinterest', Icon: Pin, isEssential: false },
  // Fix: The 'Reddit' icon does not exist in lucide-react. Replaced with 'AtSign'.
  { id: 'reddit', name: 'Reddit', Icon: AtSign, isEssential: false },
  // Fix: The 'Tiktok' icon does not exist in lucide-react. Replaced with 'Video'.
  { id: 'tiktok', name: 'TikTok', Icon: Video, isEssential: false },
  { id: 'camera', name: 'Camera', Icon: Camera, isEssential: false },
  { id: 'settings', name: 'Settings', Icon: Settings, isEssential: false },
  { id: 'wechat', name: 'WeChat', Icon: MessageCircle, isEssential: false },
];


export const EMERGENCY_CONTACTS: EmergencyContact[] = [
    { id: '1', name: 'Jane Doe', avatarUrl: 'https://picsum.photos/id/237/100/100' },
    { id: '2', name: 'John Smith', avatarUrl: 'https://picsum.photos/id/238/100/100' },
    { id: '3', name: 'Mom', avatarUrl: 'https://picsum.photos/id/239/100/100' },
]
