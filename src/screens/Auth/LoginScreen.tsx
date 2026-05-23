import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useTheme } from '../../theme'
import Oreo from '../../components/onBoarding/Oreo'
import Chips from '../../components/onBoarding/Chip'
import { AuthContext } from '../../context/AuthContext'

const LoginScreen = ({ navigation }: any) => {
  const { colors, roundness, shadows, typography, spacing } = useTheme()
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try {
      await login(email.trim(), password)
      // If this navigator is nested, call parent to replace the root route
      // if (navigation.getParent && navigation.getParent()) {
      //   navigation.getParent().replace('Main')
      // } else {
      //   navigation.replace('Main')
      // }
    } catch (err: any) {
      Alert.alert('Login failed', err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Oreo />

      <View style={[styles.inner, { padding: spacing.md }]}>
        <Text style={[styles.headerTitle, { color: colors.text, fontFamily: typography.fonts.bold }]}>Welcome Back</Text>
        <Text style={[styles.headerSub, { color: colors.textSecondary }]}>Sign in to continue ordering your favorites</Text>

        <View style={{ flexDirection: 'row', marginTop: spacing.md }}>
          <View style={[styles.tagPill, { backgroundColor: colors.primaryLight, marginRight: 8 }]}>
            <Text style={[styles.tagText, { color: colors.primary }]}>Fast Delivery</Text>
          </View>
          <View style={[styles.tagPill, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.tagText, { color: colors.primary }]}>No Minimum</Text>
          </View>
        </View>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, { borderColor: colors.border, backgroundColor: colors.surface }]}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[styles.input, { borderColor: colors.border, backgroundColor: colors.surface }]}
        />

        <TouchableOpacity onPress={() => Alert.alert('Forgot password', 'Password reset!')}>
          <Text style={[styles.forgotText, { color: colors.primary }]}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary, borderRadius: roundness.md, ...shadows.premium }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { color: colors.textOnPrimary, fontFamily: typography.fonts.bold }]}>{loading ? 'Signing in...' : 'Login'}</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <Text style={[styles.dividerText, { color: colors.textSecondary }]}> or continue with </Text>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
        </View>

        <TouchableOpacity style={[styles.googleBtn, { borderRadius: roundness.md }]} onPress={() => Alert.alert('Google Sign-In', 'Not wired in this demo')}>
          <Text style={[styles.googleText, { color: colors.text }]}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.signUpRow}>
          <Text style={{ color: colors.textSecondary }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
            <Text style={{ color: colors.primary, fontWeight: '700' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Chips />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: 'center' },
  headerTitle: { fontSize: 28, marginBottom: 6 },
  headerSub: { fontSize: 14, marginBottom: 12 },
  tagPill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  tagText: { fontSize: 12, fontWeight: '700' },
  input: { borderWidth: 1, padding: 12, borderRadius: 10, marginTop: 12 },
  forgotText: { marginTop: 10, textAlign: 'right', marginBottom: 12 },
  button: { padding: 14, marginTop: 6 },
  buttonText: { textAlign: 'center', fontSize: 16 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  divider: { height: 1, flex: 1 },
  dividerText: { marginHorizontal: 10, fontSize: 12 },
  googleBtn: { padding: 12, marginTop: 12, alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  googleText: { fontSize: 14 },
  signUpRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 }
})