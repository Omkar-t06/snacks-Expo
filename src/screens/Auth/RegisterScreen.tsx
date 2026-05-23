import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useTheme } from '../../theme'
import Oreo from '../../components/onBoarding/Oreo'
import Chips from '../../components/onBoarding/Chip'
import { AuthContext } from '../../context/AuthContext'

const RegisterScreen = ({ navigation }: any) => {
  const { colors, roundness, shadows, typography, spacing } = useTheme()
  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setLoading(true)
    try {
      await signUp(name.trim(), email.trim(), password)
      // If this navigator is nested, call parent to replace the root route
      // if (navigation.getParent && navigation.getParent()) {
      //   navigation.getParent().replace('Main')
      // } else {
      //   navigation.replace('Main')
      // }
    } catch (err: any) {
      Alert.alert('Sign up failed', err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Oreo />

      <View style={[styles.inner, { padding: spacing.md }]}>
        <Text style={[styles.headerTitle, { color: colors.text, fontFamily: typography.fonts.bold }]}>Create Account</Text>
        <Text style={[styles.headerSub, { color: colors.textSecondary }]}>Join SnackExpo to start ordering</Text>

        <View style={{ flexDirection: 'row', marginTop: spacing.md }}>
          <View style={[styles.tagPill, { backgroundColor: colors.primaryLight, marginRight: 8 }]}>
            <Text style={[styles.tagText, { color: colors.primary }]}>Curated Picks</Text>
          </View>
          <View style={[styles.tagPill, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.tagText, { color: colors.primary }]}>Fast Checkout</Text>
          </View>
        </View>

        <TextInput
          placeholder="Full name"
          value={name}
          onChangeText={setName}
          style={[styles.input, { borderColor: colors.border, backgroundColor: colors.surface }]}
        />

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

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary, borderRadius: roundness.md, ...shadows.premium }]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { color: colors.textOnPrimary, fontFamily: typography.fonts.bold }]}>{loading ? 'Creating...' : 'Create account'}</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <Text style={[styles.dividerText, { color: colors.textSecondary }]}> or continue with </Text>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
        </View>

        <TouchableOpacity style={[styles.googleBtn, { borderRadius: roundness.md }]} onPress={() => Alert.alert('Google Sign-Up', 'Not wired in this demo')}>
          <Text style={[styles.googleText, { color: colors.text }]}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.signUpRow}>
          <Text style={{ color: colors.textSecondary }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={{ color: colors.primary, fontWeight: '700' }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Chips />
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: 'center' },
  headerTitle: { fontSize: 28, marginBottom: 6 },
  headerSub: { fontSize: 14, marginBottom: 12 },
  tagPill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  tagText: { fontSize: 12, fontWeight: '700' },
  input: { borderWidth: 1, padding: 12, borderRadius: 10, marginTop: 12 },
  button: { padding: 14, marginTop: 6 },
  buttonText: { textAlign: 'center', fontSize: 16 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  divider: { height: 1, flex: 1 },
  dividerText: { marginHorizontal: 10, fontSize: 12 },
  googleBtn: { padding: 12, marginTop: 12, alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  googleText: { fontSize: 14 },
  signUpRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 }
})