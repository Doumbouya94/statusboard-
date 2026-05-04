import React from 'react';

const statusColors = {
    'En ligne': 'green',
    'Absent': 'orange',
    'Occupé': 'red'
};

function MemberCard({ member, isCurrentUser, onStatusChange }) {
    const initials = member.name.slice(0, 2).toUpperCase();

    return (
        <div className={`member-card ${isCurrentUser ? 'current-user' : ''}`}>
            <div className="member-avatar" style={{ backgroundColor: statusColors[member.status] }}>
                {initials}
            </div>
            <div className="member-info">
                <span className="member-name">{member.name}</span>
                <span className="member-role">{isCurrentUser ? 'Vous' : 'Membre'}</span>
                <span className="member-status" style={{ color: statusColors[member.status] }}>
          ● {member.status}
        </span>
            </div>

            {isCurrentUser && (
                <div className="status-buttons">
                    <button onClick={() => onStatusChange('En ligne')} className="btn-online">En ligne</button>
                    <button onClick={() => onStatusChange('Absent')} className="btn-absent">Absent</button>
                    <button onClick={() => onStatusChange('Occupé')} className="btn-busy">Occupé</button>
                </div>
            )}
        </div>
    );
}

export default MemberCard;