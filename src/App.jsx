import { useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from './auth/supabaseClient'
import './App.css'

function App() {
  const initialServers = useMemo(
    () => [
      {
        id: 'aurora',
        name: 'Aurora Studio',
        members: 1248,
        channels: [
          { id: 'welcome', name: 'welcome', type: 'text', unread: 2 },
          { id: 'announcements', name: 'announcements', type: 'text', unread: 0 },
          { id: 'design-chat', name: 'design-chat', type: 'text', unread: 7 },
        ],
        forums: [
          {
            id: 'feedback',
            title: 'Feedback Forum',
            tags: ['branding', 'ui', 'print'],
            posts: 38,
          },
          {
            id: 'resources',
            title: 'Resource Library',
            tags: ['fonts', 'templates'],
            posts: 21,
          },
        ],
        threads: [
          { id: 'logo-revamp', title: 'Logo Revamp', replies: 14, lastActive: '2h' },
          { id: 'home-page', title: 'Homepage Critique', replies: 9, lastActive: '5h' },
          { id: 'motion-kit', title: 'Motion Kit Ideas', replies: 22, lastActive: '1d' },
        ],
        roles: [
          {
            id: 'owner',
            name: 'Owner',
            color: 'role role-owner',
            permissions: ['All Access', 'Billing', 'Moderation'],
          },
          {
            id: 'mod',
            name: 'Moderator',
            color: 'role role-mod',
            permissions: ['Manage Channels', 'Timeout Members', 'Pin Posts'],
          },
          {
            id: 'creator',
            name: 'Creator',
            color: 'role role-creator',
            permissions: ['Post Media', 'Start Events', 'Create Threads'],
          },
          {
            id: 'member',
            name: 'Member',
            color: 'role role-member',
            permissions: ['Chat', 'Join Voice', 'React'],
          },
        ],
        events: [
          {
            id: 'office-hours',
            title: 'Design Office Hours',
            time: 'Wed 6:00 PM',
            host: 'Hosted by Jade',
            location: 'design-chat',
          },
          {
            id: 'critique-night',
            title: 'Critique Night',
            time: 'Fri 8:00 PM',
            host: 'Hosted by Ezra',
            location: 'announcements',
          },
          {
            id: 'portfolio',
            title: 'Portfolio Review',
            time: 'Sun 4:00 PM',
            host: 'Hosted by Mira',
            location: 'design-chat',
          },
        ],
        tools: [
          { id: 'automod', name: 'AutoMod', detail: 'Keyword filters, spam detection', status: 'Active' },
          { id: 'verification', name: 'Verification', detail: 'Email + rule acknowledgment', status: 'Enabled' },
          { id: 'insights', name: 'Insights', detail: 'Weekly engagement reports', status: 'Tracking' },
          { id: 'member-apps', name: 'Member Applications', detail: 'Review new member forms', status: '12 pending' },
        ],
      },
      {
        id: 'nightwatch',
        name: 'Nightwatch Gaming',
        members: 3890,
        channels: [
          { id: 'lfg', name: 'lfg', type: 'text', unread: 4 },
          { id: 'patch-notes', name: 'patch-notes', type: 'text', unread: 0 },
          { id: 'clips', name: 'clips', type: 'text', unread: 1 },
          { id: 'party-chat', name: 'party-chat', type: 'voice', unread: 0 },
          { id: 'raid-briefing', name: 'raid-briefing', type: 'stage', unread: 0 },
        ],
        forums: [
          {
            id: 'builds',
            title: 'Build Guides',
            tags: ['pvp', 'pve', 'loadouts'],
            posts: 54,
          },
          {
            id: 'strats',
            title: 'Strategy Board',
            tags: ['raid', 'dungeon'],
            posts: 29,
          },
        ],
        threads: [
          { id: 'clan-recruit', title: 'Clan Recruitment', replies: 31, lastActive: '3h' },
          { id: 'meta', title: 'Current Meta', replies: 18, lastActive: '7h' },
          { id: 'season-roadmap', title: 'Season Roadmap', replies: 6, lastActive: '1d' },
        ],
        roles: [
          {
            id: 'admin',
            name: 'Admin',
            color: 'role role-owner',
            permissions: ['Server Settings', 'Manage Roles', 'Moderation'],
          },
          {
            id: 'captain',
            name: 'Captain',
            color: 'role role-mod',
            permissions: ['Schedule Events', 'Manage Voice', 'Pin Posts'],
          },
          {
            id: 'raider',
            name: 'Raider',
            color: 'role role-creator',
            permissions: ['Join Raids', 'Create Threads', 'Stream'],
          },
          {
            id: 'guest',
            name: 'Guest',
            color: 'role role-member',
            permissions: ['Read Channels', 'Join Voice'],
          },
        ],
        events: [
          {
            id: 'scrim',
            title: 'PvP Scrim',
            time: 'Thu 7:30 PM',
            host: 'Hosted by Nova',
            location: 'party-chat',
          },
          {
            id: 'raid',
            title: 'Raid Run',
            time: 'Sat 9:00 PM',
            host: 'Hosted by Vex',
            location: 'raid-briefing',
          },
        ],
        tools: [
          { id: 'ticket', name: 'Support Tickets', detail: 'Queue for player help', status: 'Open' },
          { id: 'slowmode', name: 'Slowmode', detail: 'Cooldown on #lfg', status: '10s' },
          { id: 'mod-log', name: 'Mod Log', detail: 'Action audit channel', status: 'Live' },
          { id: 'welcome-bot', name: 'Welcome Bot', detail: 'Auto-roles new members', status: 'Enabled' },
        ],
      },
    ],
    []
  )

  const [servers, setServers] = useState(initialServers)
  const defaultMessages = useMemo(
    () => ({
      aurora: [
        {
          id: 'aurora-1',
          author: 'Jade',
          content: 'Welcome! Share your latest project in this channel.',
          time: '09:12',
          channelId: 'welcome',
        },
        {
          id: 'aurora-2',
          author: 'Mira',
          content: 'Office hours are live tonight. Drop questions in threads.',
          time: '09:26',
          channelId: 'announcements',
        },
        {
          id: 'aurora-3',
          author: 'Ezra',
          content: 'Anyone want to review branding drafts together?',
          time: '10:03',
          channelId: 'design-chat',
        },
      ],
      nightwatch: [
        {
          id: 'nightwatch-1',
          author: 'Nova',
          content: 'Raid signup is open! Post your role and availability.',
          time: '11:12',
          channelId: 'lfg',
        },
        {
          id: 'nightwatch-2',
          author: 'Vex',
          content: 'Patch notes are up. Let’s review the balance changes.',
          time: '11:40',
          channelId: 'patch-notes',
        },
        {
          id: 'nightwatch-3',
          author: 'Kai',
          content: 'Drop your best clips from last night’s run.',
          time: '12:05',
          channelId: 'clips',
        },
      ],
    }),
    []
  )

  const [activeServerId, setActiveServerId] = useState(servers[0].id)
  const [activeChannelId, setActiveChannelId] = useState(servers[0].channels[0].id)
  const [messageInput, setMessageInput] = useState('')
  const [newChannelName, setNewChannelName] = useState('')
  const [isAddChannelOpen, setIsAddChannelOpen] = useState(false)
  const [session, setSession] = useState(null)
  const [authMode, setAuthMode] = useState('sign-in')
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authStatus, setAuthStatus] = useState({ loading: false, error: '', message: '' })
  const [messagesLoading, setMessagesLoading] = useState(false)
  const [channelsLoading, setChannelsLoading] = useState(false)
  const [editingChannelId, setEditingChannelId] = useState(null)
  const [editingChannelName, setEditingChannelName] = useState('')
  const [rolesLoading, setRolesLoading] = useState(false)
  const [rolesByServer, setRolesByServer] = useState(() => {
    const initial = {}
    initialServers.forEach((server) => {
      initial[server.id] = []
    })
    return initial
  })
  const [roleUserIdInput, setRoleUserIdInput] = useState('')
  const [roleTypeInput, setRoleTypeInput] = useState('member')
  const [roleError, setRoleError] = useState('')
  const [channelsByServer, setChannelsByServer] = useState(() => {
    const initial = {}
    initialServers.forEach((server) => {
      initial[server.id] = server.channels
    })
    return initial
  })
  const [messagesByServer, setMessagesByServer] = useState(() => {
    const initial = {}

    initialServers.forEach((server) => {
      const stored = localStorage.getItem(`charla_messages_${server.id}`)
      initial[server.id] = stored ? JSON.parse(stored) : defaultMessages[server.id] || []
    })

    return initial
  })

  const useRemoteMessages = Boolean(isSupabaseConfigured && session && supabase)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return undefined
    }

    let isMounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setSession(data.session)
      }
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => {
      isMounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  const activeServer = servers.find((server) => server.id === activeServerId)
  const channelsForServer = channelsByServer[activeServerId] || []
  const activeChannel = channelsForServer.find((channel) => channel.id === activeChannelId)
  const safeActiveChannel = activeChannel || channelsForServer[0] || null
  const isTextChannel = safeActiveChannel?.type === 'text'
  const rolesForServer = rolesByServer[activeServerId] || []
  const currentUserRole = rolesForServer.find((role) => role.user_id === session?.user.id)?.role
  const canManageRoles = !useRemoteMessages || ['owner', 'mod'].includes(currentUserRole || '')
  const canManageChannels = !useRemoteMessages || ['owner', 'mod'].includes(currentUserRole || '')
  const visibleMessages = messagesByServer[activeServerId].filter(
    (message) => message.channelId === activeChannelId
  )

  useEffect(() => {
    if (safeActiveChannel && safeActiveChannel.id !== activeChannelId) {
      setActiveChannelId(safeActiveChannel.id)
    }
  }, [safeActiveChannel, activeChannelId])

  useEffect(() => {
    if (useRemoteMessages) {
      return
    }

    Object.entries(messagesByServer).forEach(([serverId, messages]) => {
      localStorage.setItem(`charla_messages_${serverId}`, JSON.stringify(messages))
    })
  }, [messagesByServer, useRemoteMessages])

  useEffect(() => {
    if (!useRemoteMessages || !supabase) {
      return undefined
    }

    setMessagesByServer((prev) => {
      const next = { ...prev }
      servers.forEach((server) => {
        next[server.id] = []
      })
      return next
    })

    return undefined
  }, [useRemoteMessages, servers])

  useEffect(() => {
    if (!useRemoteMessages || !supabase) {
      return undefined
    }

    let isMounted = true
    setChannelsLoading(true)

    const loadChannels = async () => {
      const { data, error } = await supabase
        .from('channels')
        .select('id, name, type, created_at')
        .eq('server_id', activeServerId)
        .order('created_at', { ascending: true })

      if (!isMounted) {
        return
      }

      if (error) {
        console.error('Failed to load channels', error)
        setChannelsLoading(false)
        return
      }

      setChannelsByServer((prev) => ({
        ...prev,
        [activeServerId]: data || [],
      }))
      setChannelsLoading(false)
    }

    loadChannels()

    const channel = supabase
      .channel(`channels-${activeServerId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'channels', filter: `server_id=eq.${activeServerId}` },
        (payload) => {
          if (!payload.new) {
            return
          }

          setChannelsByServer((prev) => {
            const existing = prev[activeServerId] || []
            if (existing.some((channel) => channel.id === payload.new.id)) {
              return prev
            }
            return { ...prev, [activeServerId]: [...existing, payload.new] }
          })
        }
      )
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [activeServerId, useRemoteMessages])

  useEffect(() => {
    if (!useRemoteMessages || !supabase) {
      return undefined
    }

    let isMounted = true
    setRolesLoading(true)

    const loadRoles = async () => {
      const { data, error } = await supabase
        .from('server_roles')
        .select('id, user_id, role, created_at')
        .eq('server_id', activeServerId)
        .order('created_at', { ascending: true })

      if (!isMounted) {
        return
      }

      if (error) {
        console.error('Failed to load roles', error)
        setRolesLoading(false)
        return
      }

      setRolesByServer((prev) => ({
        ...prev,
        [activeServerId]: data || [],
      }))
      setRolesLoading(false)
    }

    loadRoles()

    const channel = supabase
      .channel(`roles-${activeServerId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'server_roles', filter: `server_id=eq.${activeServerId}` },
        (payload) => {
          setRolesByServer((prev) => {
            const existing = prev[activeServerId] || []
            if (payload.eventType === 'INSERT' && payload.new) {
              if (existing.some((role) => role.id === payload.new.id)) {
                return prev
              }
              return { ...prev, [activeServerId]: [...existing, payload.new] }
            }
            if (payload.eventType === 'UPDATE' && payload.new) {
              return {
                ...prev,
                [activeServerId]: existing.map((role) =>
                  role.id === payload.new.id ? payload.new : role
                ),
              }
            }
            if (payload.eventType === 'DELETE' && payload.old) {
              return {
                ...prev,
                [activeServerId]: existing.filter((role) => role.id !== payload.old.id),
              }
            }
            return prev
          })
        }
      )
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [activeServerId, useRemoteMessages])

  useEffect(() => {
    if (!useRemoteMessages || !supabase) {
      return undefined
    }

    let isMounted = true
    setMessagesLoading(true)

    const mapDbMessage = (row) => ({
      id: row.id,
      author: row.author_name || 'Member',
      content: row.content,
      time: new Date(row.inserted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channelId: row.channel_id,
    })

    const loadMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('id, author_name, content, inserted_at, channel_id')
        .eq('server_id', activeServerId)
        .order('inserted_at', { ascending: true })

      if (!isMounted) {
        return
      }

      if (error) {
        console.error('Failed to load messages', error)
        setMessagesLoading(false)
        return
      }

      const mapped = (data || []).map(mapDbMessage)
      setMessagesByServer((prev) => ({ ...prev, [activeServerId]: mapped }))
      setMessagesLoading(false)
    }

    loadMessages()

    const channel = supabase
      .channel(`messages-${activeServerId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `server_id=eq.${activeServerId}` },
        (payload) => {
          if (!payload.new) {
            return
          }

          const mapped = mapDbMessage(payload.new)
          setMessagesByServer((prev) => {
            const existing = prev[activeServerId] || []
            if (existing.some((message) => message.id === mapped.id)) {
              return prev
            }
            return { ...prev, [activeServerId]: [...existing, mapped] }
          })
        }
      )
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [activeServerId, useRemoteMessages])

  const handleSendMessage = (event) => {
    event.preventDefault()
    const trimmed = messageInput.trim()

    if (!trimmed || !isTextChannel || !activeChannelId) {
      return
    }

    if (useRemoteMessages && supabase && session) {
      supabase
        .from('messages')
        .insert({
          server_id: activeServerId,
          channel_id: activeChannelId,
          content: trimmed,
          author_id: session.user.id,
          author_name: session.user.email?.split('@')[0] || 'Member',
        })
        .select('id, author_name, content, inserted_at, channel_id')
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Failed to send message', error)
            return
          }

          if (!data) {
            return
          }

          const nextMessage = {
            id: data.id,
            author: data.author_name || 'Member',
            content: data.content,
            time: new Date(data.inserted_at).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            channelId: data.channel_id,
          }

          setMessagesByServer((prev) => ({
            ...prev,
            [activeServerId]: [...(prev[activeServerId] || []), nextMessage],
          }))
        })
    } else {
      const nextMessage = {
        id: `${activeServerId}-${Date.now()}`,
        author: 'You',
        content: trimmed,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        channelId: activeChannelId,
      }

      setMessagesByServer((prev) => ({
        ...prev,
        [activeServerId]: [...prev[activeServerId], nextMessage],
      }))
    }
    setMessageInput('')
  }

  const handleAuthSubmit = async (event) => {
    event.preventDefault()
    setAuthStatus({ loading: true, error: '', message: '' })

    if (!isSupabaseConfigured || !supabase) {
      setAuthStatus({ loading: false, error: 'Supabase is not configured.', message: '' })
      return
    }

    if (!authEmail || !authPassword) {
      setAuthStatus({ loading: false, error: 'Email and password are required.', message: '' })
      return
    }

    const payload = { email: authEmail, password: authPassword }
    const { error } =
      authMode === 'sign-in'
        ? await supabase.auth.signInWithPassword(payload)
        : await supabase.auth.signUp(payload)

    if (error) {
      setAuthStatus({ loading: false, error: error.message, message: '' })
      return
    }

    setAuthStatus({
      loading: false,
      error: '',
      message: authMode === 'sign-in' ? 'Signed in successfully.' : 'Check your email to confirm.',
    })
  }

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
  }

  const handleAddChannel = (event) => {
    event.preventDefault()
    const trimmed = newChannelName.trim().toLowerCase().replace(/\s+/g, '-')

    if (!trimmed) {
      return
    }

    if (useRemoteMessages && supabase) {
      if (!canManageChannels) {
        return
      }

      supabase
        .from('channels')
        .insert({
          server_id: activeServerId,
          name: trimmed,
          type: 'text',
        })
        .select('id, name, type, created_at')
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Failed to create channel', error)
            return
          }

          if (!data) {
            return
          }

          setChannelsByServer((prev) => ({
            ...prev,
            [activeServerId]: [...(prev[activeServerId] || []), data],
          }))
          setActiveChannelId(data.id)
        })
    } else {
      const newChannel = {
        id: `${trimmed}-${Date.now()}`,
        name: trimmed,
        type: 'text',
        unread: 0,
      }

      setChannelsByServer((prev) => ({
        ...prev,
        [activeServerId]: [...(prev[activeServerId] || []), newChannel],
      }))
      setActiveChannelId(newChannel.id)
    }

    setNewChannelName('')
    setIsAddChannelOpen(false)
  }

  const handleAddRole = async (event) => {
    event.preventDefault()
    setRoleError('')

    if (!useRemoteMessages || !supabase) {
      return
    }

    if (!canManageRoles) {
      setRoleError('You do not have permission to manage roles.')
      return
    }

    const userId = roleUserIdInput.trim()
    if (!userId) {
      setRoleError('User ID is required.')
      return
    }

    const { data, error } = await supabase
      .from('server_roles')
      .insert({
        server_id: activeServerId,
        user_id: userId,
        role: roleTypeInput,
      })
      .select('id, user_id, role, created_at')
      .single()

    if (error) {
      setRoleError(error.message)
      return
    }

    if (data) {
      setRolesByServer((prev) => ({
        ...prev,
        [activeServerId]: [...(prev[activeServerId] || []), data],
      }))
    }

    setRoleUserIdInput('')
    setRoleTypeInput('member')
  }

  const handleUpdateRole = async (roleId, nextRole) => {
    if (!useRemoteMessages || !supabase || !canManageRoles) {
      return
    }

    const { error } = await supabase.from('server_roles').update({ role: nextRole }).eq('id', roleId)
    if (error) {
      console.error('Failed to update role', error)
      return
    }

    setRolesByServer((prev) => ({
      ...prev,
      [activeServerId]: (prev[activeServerId] || []).map((role) =>
        role.id === roleId ? { ...role, role: nextRole } : role
      ),
    }))
  }

  const handleRemoveRole = async (role) => {
    if (!useRemoteMessages || !supabase || !canManageRoles) {
      return
    }

    if (!window.confirm(`Remove ${role.role} role for ${role.user_id}?`)) {
      return
    }

    const { error } = await supabase.from('server_roles').delete().eq('id', role.id)
    if (error) {
      console.error('Failed to remove role', error)
      return
    }

    setRolesByServer((prev) => ({
      ...prev,
      [activeServerId]: (prev[activeServerId] || []).filter((item) => item.id !== role.id),
    }))
  }
  const startEditingChannel = (channel) => {
    setEditingChannelId(channel.id)
    setEditingChannelName(channel.name)
  }

  const cancelEditingChannel = () => {
    setEditingChannelId(null)
    setEditingChannelName('')
  }

  const saveChannelName = async (channel) => {
    const trimmed = editingChannelName.trim().toLowerCase().replace(/\s+/g, '-')
    if (!trimmed) {
      return
    }

    if (useRemoteMessages && supabase) {
      const { error } = await supabase
        .from('channels')
        .update({ name: trimmed })
        .eq('id', channel.id)

      if (error) {
        console.error('Failed to rename channel', error)
        return
      }
    }

    setChannelsByServer((prev) => ({
      ...prev,
      [activeServerId]: (prev[activeServerId] || []).map((item) =>
        item.id === channel.id ? { ...item, name: trimmed } : item
      ),
    }))
    cancelEditingChannel()
  }

  const deleteChannel = async (channel) => {
    if (!window.confirm(`Delete #${channel.name}? This cannot be undone.`)) {
      return
    }

    if (useRemoteMessages && supabase) {
      const { error } = await supabase.from('channels').delete().eq('id', channel.id)
      if (error) {
        console.error('Failed to delete channel', error)
        return
      }

      await supabase.from('messages').delete().eq('channel_id', channel.id)
    }

    setChannelsByServer((prev) => ({
      ...prev,
      [activeServerId]: (prev[activeServerId] || []).filter((item) => item.id !== channel.id),
    }))

    if (activeChannelId === channel.id) {
      setActiveChannelId('')
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <h1>Supabase not configured</h1>
          <p className="muted">
            Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to a `.env` file and restart the dev
            server.
          </p>
          <div className="auth-warning">
            <p>Example:</p>
            <p className="muted">VITE_SUPABASE_URL="https://your-project.supabase.co"</p>
            <p className="muted">VITE_SUPABASE_ANON_KEY="your-anon-key"</p>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <h1>Welcome to Charla</h1>
          <p className="muted">Sign in to join your servers and channels.</p>
          <form className="auth-form" onSubmit={handleAuthSubmit}>
            <label>
              Email
              <input
                type="email"
                value={authEmail}
                onChange={(event) => setAuthEmail(event.target.value)}
                placeholder="you@company.com"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={authPassword}
                onChange={(event) => setAuthPassword(event.target.value)}
                placeholder="••••••••"
              />
            </label>
            {authStatus.error && <p className="error-text">{authStatus.error}</p>}
            {authStatus.message && <p className="success-text">{authStatus.message}</p>}
            <button className="primary" type="submit" disabled={authStatus.loading}>
              {authStatus.loading
                ? 'Working...'
                : authMode === 'sign-in'
                  ? 'Sign In'
                  : 'Create Account'}
            </button>
          </form>
          <button
            className="ghost auth-toggle"
            type="button"
            onClick={() => setAuthMode((prev) => (prev === 'sign-in' ? 'sign-up' : 'sign-in'))}
          >
            {authMode === 'sign-in'
              ? 'New here? Create an account'
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <aside className="server-list">
        <div className="server-list__header">Servers</div>
        {servers.map((server) => (
          <button
            key={server.id}
            className={`server-pill ${server.id === activeServerId ? 'is-active' : ''}`}
            onClick={() => {
              setActiveServerId(server.id)
              setActiveChannelId(server.channels[0].id)
            }}
            type="button"
          >
            <span className="server-pill__badge">{server.name.slice(0, 2)}</span>
            <span className="server-pill__name">{server.name}</span>
            <span className="server-pill__members">{server.members.toLocaleString()} members</span>
          </button>
        ))}
      </aside>

      <aside className="channel-list">
        <div className="channel-list__header">
          <div>
            <p className="eyebrow">Active server</p>
            <h2>{activeServer.name}</h2>
          </div>
          <div className="channel-list__meta">
            <span>{channelsForServer.length} channels</span>
            <span>{activeServer.forums.length} forums</span>
          </div>
        </div>
        <div className="channel-section">
          <div className="section-header">
            <p className="section-label">Text Channels</p>
            <button
              className="icon-button"
              type="button"
              onClick={() => setIsAddChannelOpen((prev) => !prev)}
              aria-label="Add text channel"
              title="Add text channel"
              disabled={!canManageChannels}
            >
              +
            </button>
          </div>
          {isAddChannelOpen && (
            <form className="channel-add" onSubmit={handleAddChannel}>
              <input
                type="text"
                value={newChannelName}
                onChange={(event) => setNewChannelName(event.target.value)}
                placeholder="Add text channel"
              />
              <button className="ghost" type="submit">Add</button>
            </form>
          )}
          {channelsLoading ? (
            <p className="muted">Loading channels...</p>
          ) : channelsForServer.filter((channel) => channel.type === 'text').length === 0 ? (
            <div className="empty-channel">
              <p className="muted">No text channels yet.</p>
              <button
                className="ghost"
                type="button"
                onClick={() => setIsAddChannelOpen(true)}
                disabled={!canManageChannels}
              >
                + Add a channel
              </button>
              {!canManageChannels && <p className="muted">Ask a mod to create the first channel.</p>}
            </div>
          ) : (
            channelsForServer
              .filter((channel) => channel.type === 'text')
              .map((channel) => (
                <button
                  key={channel.id}
                  className={`channel-row ${channel.id === activeChannelId ? 'is-active' : ''}`}
                  onClick={() => setActiveChannelId(channel.id)}
                  type="button"
                >
                  <span className="channel-row__label">#</span>
                  {editingChannelId === channel.id ? (
                    <span className="channel-row__edit" onClick={(event) => event.stopPropagation()}>
                      <input
                        type="text"
                        value={editingChannelName}
                        onChange={(event) => setEditingChannelName(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            saveChannelName(channel)
                          }
                          if (event.key === 'Escape') {
                            cancelEditingChannel()
                          }
                        }}
                        autoFocus
                      />
                    </span>
                  ) : (
                    <span className="channel-row__name">{channel.name}</span>
                  )}
                  {(channel.unread || 0) > 0 && <span className="pill">{channel.unread}</span>}
                  <span className="channel-row__actions" onClick={(event) => event.stopPropagation()}>
                    {editingChannelId === channel.id ? (
                      <>
                        <button
                          className="icon-button icon-button--small"
                          type="button"
                          onClick={() => saveChannelName(channel)}
                          aria-label="Save channel name"
                          title="Save"
                        >
                          ✓
                        </button>
                        <button
                          className="icon-button icon-button--small"
                          type="button"
                          onClick={cancelEditingChannel}
                          aria-label="Cancel rename"
                          title="Cancel"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="icon-button icon-button--small"
                          type="button"
                          onClick={() => startEditingChannel(channel)}
                          aria-label="Rename channel"
                          title="Rename"
                        >
                          ✎
                        </button>
                        <button
                          className="icon-button icon-button--small danger"
                          type="button"
                          onClick={() => deleteChannel(channel)}
                          aria-label="Delete channel"
                          title="Delete"
                        >
                          🗑
                        </button>
                      </>
                    )}
                  </span>
                </button>
              ))
          )}
        </div>
        <div className="channel-section">
          {channelsForServer
            .filter((channel) => channel.type !== 'text')
            .map((channel) => (
              <button
                key={channel.id}
                className={`channel-row ${channel.id === activeChannelId ? 'is-active' : ''}`}
                onClick={() => setActiveChannelId(channel.id)}
                type="button"
              >
                <span>{channel.type === 'voice' ? '🔊' : '🎤'} {channel.name}</span>
              </button>
            ))}
        </div>
        {useRemoteMessages && (
          <div className="channel-section role-section">
            <div className="section-header">
              <p className="section-label">Roles</p>
              {currentUserRole && <span className="pill role-pill">{currentUserRole}</span>}
            </div>
            {rolesLoading ? (
              <p className="muted">Loading roles...</p>
            ) : rolesForServer.length === 0 ? (
              <p className="muted">No roles yet.</p>
            ) : (
              <div className="role-list">
                {rolesForServer.map((role) => (
                  <div key={role.id} className="role-row">
                    <div>
                      <p className="role-user">{role.user_id}</p>
                      <p className="muted">Role: {role.role}</p>
                    </div>
                    {canManageRoles && (
                      <div className="role-actions">
                        <select
                          value={role.role}
                          onChange={(event) => handleUpdateRole(role.id, event.target.value)}
                        >
                          <option value="owner">Owner</option>
                          <option value="mod">Mod</option>
                          <option value="member">Member</option>
                        </select>
                        <button
                          className="icon-button icon-button--small danger"
                          type="button"
                          onClick={() => handleRemoveRole(role)}
                          title="Remove role"
                        >
                          🗑
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {canManageRoles ? (
              <form className="role-add" onSubmit={handleAddRole}>
                <input
                  type="text"
                  value={roleUserIdInput}
                  onChange={(event) => setRoleUserIdInput(event.target.value)}
                  placeholder="User ID"
                />
                <select
                  value={roleTypeInput}
                  onChange={(event) => setRoleTypeInput(event.target.value)}
                >
                  <option value="owner">Owner</option>
                  <option value="mod">Mod</option>
                  <option value="member">Member</option>
                </select>
                <button className="ghost" type="submit">Add</button>
              </form>
            ) : (
              <p className="muted">You do not have permission to manage roles.</p>
            )}
            {roleError && <p className="error-text">{roleError}</p>}
          </div>
        )}
      </aside>

      <main className="content">
        <header className="chat-header">
          <div className="chat-header__title">
            <span className="chat-header__hash">#</span>
            <div>
              <h1>{safeActiveChannel ? safeActiveChannel.name : 'No channels'}</h1>
              <p className="muted">
                {!safeActiveChannel
                  ? 'Create a channel to start chatting.'
                  : isTextChannel
                    ? `Messages shared with everyone in ${activeServer.name}.`
                    : 'Voice and stage channels don’t show messages here.'}
              </p>
            </div>
          </div>
          <div className="chat-header__actions">
            <button className="ghost" type="button">Pinned</button>
            <button className="ghost" type="button">Members</button>
            <button className="ghost" type="button">Search</button>
            <button className="ghost" type="button" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        </header>

        <section className="chat-panel is-full">
          {safeActiveChannel && isTextChannel ? (
            <>
              <div className="chat-panel__messages">
                {messagesLoading ? (
                  <div className="empty-state">
                    <p>Loading messages...</p>
                    <p className="muted">Hang tight while we sync the channel.</p>
                  </div>
                ) : visibleMessages.length === 0 ? (
                  <div className="empty-state">
                    <p>No messages yet.</p>
                    <p className="muted">Start the conversation for this channel.</p>
                  </div>
                ) : (
                  visibleMessages.map((message) => (
                    <div key={message.id} className="message-row">
                      <div className="message-avatar">
                        {message.author.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="message-body">
                        <div className="message-meta">
                          <span className="message-author">{message.author}</span>
                          <span className="message-time">{message.time}</span>
                        </div>
                        <p className="message-content">{message.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <form className="chat-input" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(event) => setMessageInput(event.target.value)}
                  placeholder={`Message #${safeActiveChannel.name}`}
                />
                <button className="primary" type="submit">Send</button>
              </form>
            </>
          ) : (
            <div className="empty-state">
              <p>{safeActiveChannel ? 'Voice channels don’t have text chat here.' : 'No channels yet.'}</p>
              <p className="muted">
                {safeActiveChannel
                  ? 'Pick a text channel to open the chat room.'
                  : 'Use the + button to add your first channel.'}
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
