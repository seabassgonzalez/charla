import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const servers = useMemo(
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
  const [messagesByServer, setMessagesByServer] = useState(() => {
    const initial = {}

    servers.forEach((server) => {
      const stored = localStorage.getItem(`charla_messages_${server.id}`)
      initial[server.id] = stored ? JSON.parse(stored) : defaultMessages[server.id] || []
    })

    return initial
  })

  const activeServer = servers.find((server) => server.id === activeServerId)
  const activeChannel = activeServer.channels.find((channel) => channel.id === activeChannelId)
  const isTextChannel = activeChannel.type === 'text'
  const visibleMessages = messagesByServer[activeServerId].filter(
    (message) => message.channelId === activeChannelId
  )

  useEffect(() => {
    Object.entries(messagesByServer).forEach(([serverId, messages]) => {
      localStorage.setItem(`charla_messages_${serverId}`, JSON.stringify(messages))
    })
  }, [messagesByServer])

  const handleSendMessage = (event) => {
    event.preventDefault()
    const trimmed = messageInput.trim()

    if (!trimmed || !isTextChannel) {
      return
    }

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
    setMessageInput('')
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
            <span>{activeServer.channels.length} channels</span>
            <span>{activeServer.forums.length} forums</span>
          </div>
        </div>
        <div className="channel-section">
          <p className="section-label">Text Channels</p>
          {activeServer.channels
            .filter((channel) => channel.type === 'text')
            .map((channel) => (
              <button
                key={channel.id}
                className={`channel-row ${channel.id === activeChannelId ? 'is-active' : ''}`}
                onClick={() => setActiveChannelId(channel.id)}
                type="button"
              >
                <span># {channel.name}</span>
                {channel.unread > 0 && <span className="pill">{channel.unread}</span>}
              </button>
            ))}
        </div>
        <div className="channel-section">
          {activeServer.channels
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
      </aside>

      <main className="content">
        <header className="chat-header">
          <div className="chat-header__title">
            <span className="chat-header__hash">#</span>
            <div>
              <h1>{activeChannel.name}</h1>
              <p className="muted">
                {isTextChannel
                  ? `Messages shared with everyone in ${activeServer.name}.`
                  : 'Voice and stage channels don’t show messages here.'}
              </p>
            </div>
          </div>
          <div className="chat-header__actions">
            <button className="ghost" type="button">Pinned</button>
            <button className="ghost" type="button">Members</button>
            <button className="ghost" type="button">Search</button>
          </div>
        </header>

        <section className="chat-panel is-full">
          {isTextChannel ? (
            <>
              <div className="chat-panel__messages">
                {visibleMessages.length === 0 ? (
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
                  placeholder={`Message #${activeChannel.name}`}
                />
                <button className="primary" type="submit">Send</button>
              </form>
            </>
          ) : (
            <div className="empty-state">
              <p>Voice channels don’t have text chat here.</p>
              <p className="muted">Pick a text channel to open the chat room.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
