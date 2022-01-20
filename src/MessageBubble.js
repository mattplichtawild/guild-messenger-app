import React from 'react';
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';

export default function MessageBubble(message) {

    return (
        <ChatMsg
            side={}
            avatar={''}
            messages={[
                'Hi Jenny, How r u today?',
                'Did you train yesterday',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
            ]}
        />
    )
}