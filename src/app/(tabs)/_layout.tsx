import { Tabs } from 'expo-router';
import { Icon, type IconName } from '@/components/ui/Icon';
import { useTheme } from '@/theme/useTheme';

const TABS: { name: string; title: string; icon: IconName }[] = [
  { name: 'index', title: 'Pratik', icon: 'chat' },
  { name: 'senaryolar', title: 'Senaryolar', icon: 'compass' },
  { name: 'ilerleme', title: 'İlerlemem', icon: 'flame' },
  { name: 'profil', title: 'Profil', icon: 'user' },
];

/** Stitch alt gezinme: 4 sekme, aktif sekme mercan. */
export default function TabsLayout() {
  const { c, fonts } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.textSubtle,
        tabBarLabelStyle: { fontFamily: fonts.semibold, fontSize: 12 },
        tabBarStyle: { backgroundColor: c.bg, borderTopWidth: 0, height: 84, paddingTop: 6, shadowColor: c.shadow, shadowOpacity: 0.05, shadowRadius: 20, shadowOffset: { width: 0, height: -4 }, elevation: 8 },
      }}
    >
      {TABS.map((t) => (
        <Tabs.Screen
          key={t.name}
          name={t.name}
          options={{
            title: t.title,
            tabBarIcon: ({ color, focused }) => (
              <Icon name={t.icon} size={24} color={color as string} strokeWidth={2}
                fill={focused && (t.icon === 'chat' || t.icon === 'flame') ? c.brand : undefined} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
