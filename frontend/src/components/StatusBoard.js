import React from 'react';
import MemberCard from './MemberCard';

function StatusBoard({ members, currentUser, onStatusChange, events }) {
    const onlineCount = members.filter(m => m.status === 'En ligne').length;
    const absentCount = members.filter(m => m.status === 'Absent').length;
    const busyCount = members.filter(m => m.status === 'Occupé').length;

    return (
        <div className="board-container">
            <header className="board-header">
                <div className="board-title">
                    <div className="logo">S</div>
                    <h1>StatusBoard</h1>
                    <span className="online-badge">{members.length} en ligne</span>
                </div>
                <span className="connected-as">Connecté : {currentUser}</span>
            </header>

            <div className="board-content">
                <aside className="board-sidebar">
                    <h3>STATUTS</h3>
                    <div className="stat-item">
                        <span className="dot green">●</span> En ligne <span>{onlineCount}</span>
                    </div>
                    <div className="stat-item">
                        <span className="dot orange">●</span> Absent <span>{absentCount}</span>
                    </div>
                    <div className="stat-item">
                        <span className="dot red">●</span> Occupé <span>{busyCount}</span>
                    </div>
                    <div className="stat-total">
                        <span>Total</span> <span>{members.length}</span>
                    </div>
                </aside>

                <main className="board-main">
                    <h2>Membres connectés</h2>
                    <div className="members-grid">
                        {members.map((member, index) => (
                            <MemberCard
                                key={index}
                                member={member}
                                isCurrentUser={member.name === currentUser}
                                onStatusChange={onStatusChange}
                            />
                        ))}
                    </div>

                    <div className="events-section">
                        <h2>Historique des événements</h2>
                        <ul className="events-list">
                            {events.map((event, index) => (
                                <li key={index}>
                                    <span className="dot green">●</span>
                                    <span>{event.message}</span>
                                    <span className="event-time">{event.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
            </div>

            <footer className="board-footer">
                <span className="socket-status">● Socket.io connecté — ws://localhost:3001</span>
            </footer>
        </div>
    );
}

export default StatusBoard;