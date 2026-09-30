import { describe, expect, it } from '@jest/globals';
import { pickVoice, prosody, voiceGender, voiceQuality, type DeviceVoice } from './voice';

const v = (identifier: string, name: string, language: string, quality = 'Default'): DeviceVoice => ({ identifier, name, language, quality });

const IOS: DeviceVoice[] = [
  v('com.apple.speech.synthesis.voice.Fred', 'Fred', 'en-US'),
  v('com.apple.voice.compact.en-US.Samantha', 'Samantha', 'en-US'),
  v('com.apple.voice.enhanced.en-US.Evan', 'Evan', 'en-US', 'Enhanced'),
  v('com.apple.voice.premium.en-US.Zoe', 'Zoe', 'en-US', 'Enhanced'),
  v('com.apple.voice.compact.en-GB.Daniel', 'Daniel', 'en-GB'),
  v('com.apple.voice.compact.de-DE.Anna', 'Anna', 'de-DE'),
];

describe('ses seçimi', () => {
  it('robotik/eğlence seslerini asla seçmez', () => {
    expect(voiceQuality(IOS[0])).toBeLessThan(0);
  });
  it('kadın karaktere en kaliteli kadın sesini seçer', () => {
    expect(pickVoice(IOS, 'en-US', { gender: 'f', age: 25 })?.name).toBe('Zoe');
  });
  it('erkek karaktere erkek sesini tercih eder', () => {
    expect(pickVoice(IOS, 'en-US', { gender: 'm', age: 35 })?.name).toBe('Evan');
  });
  it('anlatıcı NPC ile aynı sesi kullanmaz', () => {
    expect(pickVoice(IOS, 'en-US', undefined, 'com.apple.voice.premium.en-US.Zoe')?.name).toBe('Evan');
  });
  it('tam bölge yoksa aynı dilin sesine düşer', () => {
    expect(pickVoice(IOS, 'en-AU', { gender: 'm', age: 30 })?.language.startsWith('en')).toBe(true);
  });
  it('Android ve web ses adlarını tanır', () => {
    expect(voiceGender(v('en-us-x-tpf-local', 'en-us-x-tpf-local', 'en-US'))).toBe('f');
    expect(voiceQuality(v('Microsoft Aria Online (Natural) - English (United States)', 'Microsoft Aria Online (Natural)', 'en-US'))).toBeGreaterThan(3);
  });
  it('yaşlı karakter biraz daha yavaş, ses cinsiyeti uyuşmazsa perde kayar', () => {
    expect(prosody({ gender: 'f', age: 60 }, undefined).rate).toBeLessThan(prosody({ gender: 'f', age: 25 }, undefined).rate);
    const male = v('x', 'Daniel', 'en-GB');
    expect(prosody({ gender: 'f', age: 25 }, male).pitch).toBeGreaterThan(prosody({ gender: 'f', age: 25 }, undefined).pitch);
  });
});
