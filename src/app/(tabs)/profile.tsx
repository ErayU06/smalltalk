import Constants from 'expo-constants';
import { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';

import { ListRow } from '@/components/list-row';
import { TabScreen } from '@/components/tab-screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { profile } from '@/data/progress';
import { useTheme } from '@/hooks/use-theme';

export default function ProfileScreen() {
  const theme = useTheme();
  // Local only until settings are persisted.
  const [reminders, setReminders] = useState(true);

  return (
    <TabScreen title="Profil">
      <View style={styles.identity}>
        <View style={[styles.avatar, { backgroundColor: theme.accent }]}>
          <ThemedText type="subtitle" style={{ color: theme.onAccent }}>
            {profile.name[0]}
          </ThemedText>
        </View>
        <View>
          <ThemedText type="smallBold">{profile.name}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {profile.targetLanguage} · {profile.level}
          </ThemedText>
        </View>
      </View>

      <Section title="ÖĞRENME">
        <ListRow label="Hedef dil" value={profile.targetLanguage} />
        <ListRow label="Seviye" value={profile.level} />
        <ListRow label="Günlük hedef" value={`${profile.dailyGoalMinutes} dk`} isLast />
      </Section>

      <Section title="UYGULAMA">
        <ListRow
          label="Pratik hatırlatıcısı"
          trailing={
            <Switch
              value={reminders}
              onValueChange={setReminders}
              trackColor={{ true: theme.accent }}
            />
          }
        />
        <ListRow label="Sürüm" value={Constants.expoConfig?.version ?? '-'} isLast />
      </Section>
    </TabScreen>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <ThemedText type="smallBold" themeColor="textSecondary">
        {title}
      </ThemedText>
      <ThemedView type="backgroundElement" style={styles.card}>
        {children}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    gap: Spacing.two,
  },
  card: {
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
});
