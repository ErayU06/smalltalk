import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { learningLang } from '../../data/availability';
import { getScenarios } from '../../data/scenarios';
import type { Prefs } from '../progress/db';
import { dailyChallenge } from './dailyChallenge';
import { reminderPlan } from './reminderPlan';

const DAYS_AHEAD = 7;

/**
 * Yerel, ücretsiz günlük hatırlatma: onboarding'de seçilen saatte, o günün meydan okumasıyla.
 * `ask`: izin henüz sorulmadıysa sor (ilk dersten sonra). Web'de ve hatırlatma kapalıysa bir şey yapmaz.
 */
export async function syncReminders(prefs: Prefs, opts: { ask?: boolean } = {}) {
  if (Platform.OS === 'web') return;
  await Notifications.cancelAllScheduledNotificationsAsync();
  if (!prefs.reminderTime) return;

  let perm = await Notifications.getPermissionsAsync();
  if (!perm.granted && perm.canAskAgain && opts.ask) perm = await Notifications.requestPermissionsAsync();
  if (!perm.granted) return;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('reminders', { name: 'Günlük hatırlatma', importance: Notifications.AndroidImportance.DEFAULT });
  }
  const scenarios = getScenarios(learningLang(prefs.targetLang));
  const plan = reminderPlan(new Date(), prefs.reminderTime, DAYS_AHEAD, (day) => dailyChallenge(day, scenarios, prefs.interests)?.title);
  for (const r of plan) {
    await Notifications.scheduleNotificationAsync({
      content: { title: r.title, body: r.body },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: r.date, channelId: 'reminders' },
    });
  }
}
