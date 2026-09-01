import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../../app/navigation/AppNavigator';

import PrimaryButton from '../../../shared/components/PrimaryButton';

import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.logo}>
          KATHE
        </Text>

        <Text style={styles.title}>
          Your story.
          {'\n'}
          Your screenplay.
        </Text>

        <Text style={styles.subtitle}>
          Tell your complete story naturally.
          {'\n'}
          KATHE will turn it into a movie script.
        </Text>

        <PrimaryButton
          title="🎙️  Tell Your Story"
          onPress={() => navigation.navigate('Recording')}
          style={styles.button}
        />

        <Text style={styles.info}>
          Your story will be recorded first,
          then converted into a screenplay.
        </Text>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },

  logo: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 5,
    marginBottom: spacing.xxl,
    color: colors.text,
  },

  title: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text,
  },

  subtitle: {
    marginTop: spacing.lg,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: colors.secondary,
  },

  button: {
    marginTop: spacing.xxl,
  },

  info: {
    marginTop: spacing.lg,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    color: colors.mutedText,
  },
});

export default HomeScreen;